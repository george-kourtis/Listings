import { useEffect, useState } from "react";
import type { ListingType } from "@/lib/types";
import Card from "@/components/Card";
import { ListingModal } from "@/components/ListingModal";

const API_URL = import.meta.env.VITE_API_URL;

export default function Listings() {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [selectedListing, setSelectedListing] = useState<ListingType | null>(
    null
  );

  const handleListingClick = (listing: ListingType) => {
    setSelectedListing(listing);
  };

  useEffect(() => {
    fetch(`${API_URL}/api/listings`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => {
        console.error("Error fetching listings", err);
        setListings([]);
      });
  }, []);
  console.log("listings", listings);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <ListingModal
        open={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        listing={selectedListing}
      />
      {listings.length > 0 ? (
        listings.map((listing: ListingType) => (
          <Card
            key={listing.id}
            listing={listing}
            onClick={handleListingClick}
          />
        ))
      ) : (
        <p>No listings found</p>
      )}
    </div>
  );
}
