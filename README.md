# Real Estate Listings Application

A full-stack application for creating and managing real estate listings, built with React, Node.js, Express, and PostgreSQL.

## 🚀 Quick Start with Docker

The easiest way to get started is using Docker Compose. This will set up the database, backend API, and frontend automatically.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### One-Command Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd challenge

# Start all services
docker-compose up
```

That's it! The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

### Alternative Commands

```bash
# Start in background
docker-compose up -d

# Rebuild containers
docker-compose up --build

# Stop all services
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## 🏗️ Architecture

### Services

1. **PostgreSQL Database** (`postgres`)

   - Port: 5432
   - Database: `listings_db`
   - User: `listings_user`
   - Password: `listings_password`

2. **Backend API** (`backend`)

   - Port: 5000
   - Node.js + Express
   - Connects to PostgreSQL
   - Provides REST API endpoints

3. **Frontend** (`frontend`)
   - Port: 3000
   - React + Vite
   - Connects to backend API

### Database Schema

The database automatically initializes with the following table:

```sql
CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    title VARCHAR(155) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('rent', 'buy', 'exchange', 'donation')),
    area VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    place_id VARCHAR(255) NOT NULL,
    extra_description TEXT,
    levels INTEGER DEFAULT 0,
    bathrooms INTEGER DEFAULT 0,
    bedrooms INTEGER DEFAULT 0,
    property_type VARCHAR(20) NOT NULL CHECK (property_type IN ('apartment', 'house', 'villa', 'office', 'store', 'other')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ Development

### Without Docker (Local Development)

If you prefer to run the application locally without Docker:

#### Backend Setup

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your database configuration
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
cp env.example .env
# Edit .env with your API URL
npm run dev
```

#### Database Setup

You'll need to set up PostgreSQL locally and run the `backend/init.sql` script.

### Environment Variables

#### Backend (`backend/env.example`)

```env
# Database Configuration (Docker)
DB_HOST=postgres
DB_PORT=5432
DB_NAME=listings_db
DB_USER=listings_user
DB_PASSWORD=listings_password

# Server Configuration
PORT=5000
NODE_ENV=development

# External API Configuration (optional)
DATA_ENDPOINT=https://your-api-endpoint.com/api

```

#### Frontend (`frontend/env.example`)

```env
VITE_API_URL=http://localhost:5000
```

## 🧩 Dependencies

### Backend (server)

Key runtime dependencies:

- cors ^2.8.5
- dotenv ^17.2.3
- express ^5.1.0
- node-cache ^5.1.2
- pg ^8.16.3
- zod ^4.1.12

### Frontend (client)

Core dependencies:

- @hookform/resolvers ^5.2.2
- @radix-ui/react-checkbox ^1.3.3
- @radix-ui/react-dialog ^1.1.15
- @radix-ui/react-label ^2.1.7
- @radix-ui/react-popover ^1.1.15
- @radix-ui/react-select ^2.2.6
- @tailwindcss/vite ^4.1.14
- class-variance-authority ^0.7.1
- clsx ^2.1.1
- cmdk ^1.1.1
- lucide-react ^0.545.0
- next-themes ^0.4.6
- react ^19.1.1
- react-dom ^19.1.1
- react-hook-form ^7.65.0
- react-router ^7.9.4
- sonner ^2.0.7
- tailwind-merge ^3.3.1
- tailwindcss ^4.1.14
- zod ^4.1.12

## 📚 API Endpoints

- `GET /` - Health check
- `POST /api/create-listing` - Create a new listing
- `GET /api/listings` - Get all listings
- `GET /api/fetch?query=<input>` - Search for areas

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :5000
   lsof -i :5432

   # Kill the process or change ports in docker-compose.yml
   ```

2. **Database connection issues**

   ```bash
   # Check if postgres is running
   docker-compose ps

   # Check postgres logs
   docker-compose logs postgres
   ```

3. **Container won't start**

   ```bash
   # Rebuild containers
   docker-compose down
   docker-compose up --build
   ```

4. **Reset everything**
   ```bash
   # Stop and remove all containers, networks, and volumes
   docker-compose down -v
   docker system prune -f
   docker-compose up --build
   ```

### Health Checks

All services include health checks. You can verify they're working:

```bash
# Check service status
docker-compose ps

# Test backend health
curl http://localhost:5000/

# Test frontend
curl http://localhost:3000/
```

## 📝 Features

- ✅ Create real estate listings
- ✅ Form validation with Zod
- ✅ Area search with autocomplete
- ✅ Multiple property types
- ✅ Responsive design
- ✅ Docker containerization
- ✅ Database auto-initialization
- ✅ Health checks
- ✅ Development hot reload

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker Compose
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
