import { formSchema } from "./schemas";
import * as z from "zod";

export type AreaType = {
  placeId: string;
  mainText: string;
  secondaryText: string;
};

export type ListingType = {
  id: string;
  title: string;
  type: string;
  area: string;
  price: string;
  bathrooms: number;
  bedrooms: number;
  levels: string;
  propertyType: string;
  extra_description: string;
  placeId: string;
  created_at: string;
  image?: string;
};

export type PropertySelectType = "rent" | "buy" | "exchange" | "donation";

export type PropertyType =
  | "apartment"
  | "house"
  | "villa"
  | "office"
  | "store"
  | "other";

export type Option = {
  value: string;
  label: string;
};

export type FormData = z.infer<typeof formSchema>;
export type FormSchemaInput = z.input<typeof formSchema>;
