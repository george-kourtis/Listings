import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { capitalizeFirstLetter } from "@/lib/helpers";
import type { ListingType } from "@/lib/types";
import { Bath, Bed, Euro, MapPin, Tag, WavesLadder } from "lucide-react";

interface ListingModalProps {
  open: boolean;
  onClose: () => void;
  listing: ListingType | null;
}

/**
 * A modal component for displaying a listing.
 *
 * @param {ListingModalProps} props - The props for the component.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {() => void} props.onClose - A callback to call when the modal is closed.
 * @param {ListingType | null} props.listing - The listing to display.
 */
export function ListingModal({ open, onClose, listing }: ListingModalProps) {
  if (!listing) return null;
  const {
    title,
    type,
    area,
    price,
    bedrooms,
    bathrooms,
    extra_description,
    created_at,
    image,
    levels,
  } = listing;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg sm:max-w-xl rounded-2xl p-0 overflow-hidden">
        {/* Image Section */}
        {image ? (
          <img
            src={image}
            alt={listing.title}
            className="w-full h-64 object-cover border-b"
          />
        ) : (
          <img
            src="https://placehold.co/400"
            alt="Placeholder"
            className="w-full h-64 object-cover border-b"
          />
        )}

        {/* Content Section */}
        <DialogTitle className="text-xl font-semibold px-6 pt-3">
          {capitalizeFirstLetter(title)}
        </DialogTitle>
        <div className="flex items-center gap-2 px-6">
          <span className="flex items-center gap-2">
            <Tag />{" "}
            <span className="font-medium text-gray-600">
              {capitalizeFirstLetter(type)}
            </span>{" "}
          </span>
          <span className="flex items-center gap-2">
            <MapPin />
            <span className="font-medium text-gray-600">{area}</span>{" "}
          </span>
        </div>
        <div className="flex items-center gap-2 px-6 pb-6">
          <span className="flex items-center gap-2">
            <Bed />{" "}
            <span className="font-medium text-gray-600">{bedrooms}</span>{" "}
          </span>
          <span className="flex items-center gap-2">
            <Bath />{" "}
            <span className="font-medium text-gray-600">{bathrooms}</span>{" "}
          </span>
          <span className="flex items-center gap-2">
            <WavesLadder />{" "}
            <span className="font-medium text-gray-600">{levels}</span>{" "}
          </span>
          <span className="flex items-center gap-2">
            <Euro /> <span className="font-medium text-gray-600">{price}</span>{" "}
          </span>
        </div>
        <DialogDescription className="px-6 pb-6 space-y-3">
          {extra_description && (
            <span className="flex items-center gap-2 text-lg">
              <span className="font-medium text-base text-gray-600">
                Description:
              </span>{" "}
              {extra_description}
            </span>
          )}
        </DialogDescription>
        <DialogFooter className="bg-gray-100 p-4">
          <span className="flex items-center gap-2">
            <span className="font-medium text-gray-600">Created At:</span>{" "}
            {new Date(created_at).toLocaleDateString("el-GR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
