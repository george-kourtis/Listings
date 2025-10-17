import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import { z } from "zod";
import NodeCache from "node-cache";

const listingSchema = z.object({
    title: z.string().min(1, "Title is required").max(156, "Max length is 155"),
    type: z.enum(["rent", "buy", "exchange", "donation"], {
        error: () => ({ message: "Type is required" }),
    }),
    area: z.string().min(1, "Area is required"),
    price: z.preprocess(
        (value) => Number(value),
        z.number().min(1, "Price must be greater than 0")
    ),
    "extra-description": z.string().optional(),
    placeId: z.string().min(1, "Place ID is required"),
    levels: z.array(z.string()).min(1, "At least one level must be selected"),
    bathrooms: z.number().min(0, "Bathrooms must be greater than 0"),
    bedrooms: z.number().min(0, "Bedrooms must be greater than 0"),
    propertyType: z.enum(
        ["apartment", "house", "villa", "office", "store", "other"],
        {
            error: () => ({ message: "Property type is required" }),
        }
    ),
});

dotenv.config();
const { Pool } = pkg;

// Use Docker database configuration when running in container
const dbConfig = process.env.DATABASE_URL || {
    host: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'listings_db',
    user: process.env.DB_USER || 'listings_user',
    password: process.env.DB_PASSWORD || 'listings_password',
};

const pool = new Pool(typeof dbConfig === 'string' ? { connectionString: dbConfig } : dbConfig);
const app = express();

app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 60 * 60 }); // Cache for 1 hour

pool.query("SELECT NOW()", (err, res) => {
    if (err) console.error("DB connection error:", err);
    else console.log("DB connected:", res.rows[0]);
});

app.get("/", (req, res) => {
    res.json({ message: "Hello from backend!" });
});

app.post("/api/create-listing", async (req, res) => {
    try {
        const validatedData = listingSchema.parse(req.body);
        console.log('validatedData', validatedData);
        const { title, type, area, price, placeId, "extra-description": extraDescription, levels, bathrooms, bedrooms, propertyType } = validatedData;

        const result = await pool.query(
            `INSERT INTO listings (title, type, area, price, place_id, extra_description, levels, bathrooms, bedrooms, property_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
            [title, type, area, price, placeId, extraDescription, levels.join(','), bathrooms, bedrooms, propertyType]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.log('INSTANCE', err instanceof z.ZodError)
        console.error('POST ERROR', err);
        if (err instanceof z.ZodError) {
            return res.status(400).json({ errors: err.issues });
        }
        res.status(500).json({ error: "Failed to save listing" });
    }
});

app.get("/api/listings", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM listings ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch listings" });
    }
});

app.get('/api/fetch', async (req, res) => {
    try {
        // Safely read query param
        const rawQuery = typeof req.query?.query === 'string' ? req.query.query : '';
        const input = rawQuery.trim().toLowerCase();

        if (!input) {
            return res.status(400).json({ error: 'missing query/input parameter' });
        }

        const cachedData = cache.get(input);
        if (cachedData) {
            console.log('cachedData', cachedData);
            return res.json(cachedData);
        }

        const upstreamUrl = process.env.DATA_ENDPOINT + `?input=${encodeURIComponent(input)}`;
        const upstream = await fetch(upstreamUrl);

        // Read upstream body (try JSON first, fallback to text)
        const contentType = upstream.headers.get('content-type') || '';
        let body;
        if (contentType.includes('application/json')) {
            body = await upstream.json();
        } else {
            body = await upstream.text();
        }

        // If upstream returned non-2xx, forward its status and body to the client
        if (!upstream.ok) {
            console.warn(`Upstream returned ${upstream.status} for ${upstreamUrl}`);
            // Use the upstream body if present for debugging, otherwise statusText
            return res.status(upstream.status).json({ error: body || upstream.statusText });
        }

        // Cache successful body and return
        cache.set(input, body, 60 * 60);
        return res.status(200).json(body);
    } catch (error) {
        console.error('fetch error', error);
        // If the error contains a status property (unlikely here), forward it; otherwise return 502
        return res.status(502).json({ error: 'Failed to fetch data', details: String(error) });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
