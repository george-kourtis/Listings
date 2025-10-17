import type { ListingType } from "@/lib/types";
import { Euro, MapPin, Tag } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/helpers";

interface CardProps {
  listing: ListingType;
  onClick: (listing: ListingType) => void;
}

/**
 * A card component for displaying a listing.
 *
 * @param {ListingType} listing - The listing to display.
 * @param {(listing: ListingType) => void} onClick - A callback function to call when the card is clicked.
 * @returns {React.ReactElement} - A React element representing the card.
 */
export default function Card({ listing, onClick }: CardProps) {
  const { title, type, area, price } = listing;

  return (
    <button
      type="button"
      className="flex flex-col gap-2 cursor-pointer text-left border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
      onClick={() => onClick(listing)}
    >
      <img
        src={listing.image || "https://placehold.co/400"}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Tag className="h-4 w-4" /> {capitalizeFirstLetter(type)}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <MapPin className="h-4 w-4" /> {area}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Euro className="h-4 w-4" /> {Number(price)}
        </p>
      </div>
    </button>
  );
}
