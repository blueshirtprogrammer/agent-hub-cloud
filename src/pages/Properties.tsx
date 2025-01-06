import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { OfferForm } from "@/components/offers/OfferForm";
import { OfferList } from "@/components/offers/OfferList";

export const Properties = () => {
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const { data: listings, isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .eq('listing_status', 'active');

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading properties...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings?.map((listing) => (
          <Card key={listing.id} className="p-6">
            <h2 className="text-xl font-semibold mb-2">{listing.address}</h2>
            {listing.price_guide && (
              <p className="text-lg mb-4">
                Price Guide: ${listing.price_guide.toLocaleString()}
              </p>
            )}
            <div className="space-y-2">
              <p>Bedrooms: {listing.bedrooms}</p>
              <p>Bathrooms: {listing.bathrooms}</p>
              <p>Parking: {listing.parking}</p>
            </div>
            
            <div className="mt-4 space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setSelectedListing(listing.id)}>
                    Make an Offer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit an Offer</DialogTitle>
                  </DialogHeader>
                  {selectedListing && (
                    <OfferForm 
                      listingId={selectedListing}
                      onSuccess={() => setSelectedListing(null)}
                    />
                  )}
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    View Offers
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Offers for {listing.address}</DialogTitle>
                  </DialogHeader>
                  <OfferList listingId={listing.id} />
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};