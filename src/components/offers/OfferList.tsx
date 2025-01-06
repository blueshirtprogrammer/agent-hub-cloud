import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";

interface OfferListProps {
  listingId: string;
}

export const OfferList = ({ listingId }: OfferListProps) => {
  const { data: offers, isLoading } = useQuery({
    queryKey: ['offers', listingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_offers')
        .select('*')
        .eq('listing_id', listingId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading offers...</div>;

  return (
    <div className="space-y-4">
      {offers?.map((offer) => (
        <Card key={offer.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-semibold">
                ${offer.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Submitted {formatDistance(new Date(offer.created_at), new Date(), { addSuffix: true })}
              </p>
            </div>
            <Badge variant={
              offer.status === 'accepted' ? 'default' :
              offer.status === 'rejected' ? 'destructive' :
              'secondary'
            }>
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </Badge>
          </div>
          <div className="mt-2">
            <p className="text-sm">Finance Days: {offer.finance_days}</p>
            <p className="text-sm">Building & Pest Days: {offer.building_pest_days}</p>
            {offer.special_conditions?.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Special Conditions:</p>
                <ul className="list-disc list-inside text-sm">
                  {offer.special_conditions.map((condition: string, index: number) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      ))}
      {(!offers || offers.length === 0) && (
        <p className="text-center text-gray-500">No offers yet</p>
      )}
    </div>
  );
};