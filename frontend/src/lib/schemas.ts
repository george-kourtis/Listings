import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(155, "Max length is 155"),
  type: z.enum(["rent", "buy", "exchange", "donation"], {
    error: () => ({ message: "Type is required" }),
  }),
  area: z.string().min(1, "Area is required"),
  price: z.string().min(1, "Price must be greater than 0").transform(Number),
  "extra-description": z.string().optional(),
  placeId: z.string().min(1, "Place ID is required"),
  levels: z.array(z.string()).min(1, "At least one level must be selected"),
  bathrooms: z
    .string()
    .min(1, "Bathrooms must be greater than 0")
    .transform(Number),
  bedrooms: z
    .string()
    .min(1, "Bedrooms must be greater than 0")
    .transform(Number),
  propertyType: z.enum(
    ["apartment", "house", "villa", "office", "store", "other"],
    {
      error: () => ({ message: "Property type is required" }),
    }
  ),
});
