import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, Home, Bed, Bath, Car } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

interface PropertyListing {
  id: string;
  address: string;
  seller_name: string;
  listing_status: string;
  price_guide: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  land_size: number | null;
}

export const Properties = () => {
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_listings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PropertyListing[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load properties. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties?.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-semibold">{property.address}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {property.seller_name}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        {property.bedrooms && (
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{property.bedrooms}</span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{property.bathrooms}</span>
                          </div>
                        )}
                        {property.parking && (
                          <div className="flex items-center gap-1">
                            <Car className="h-4 w-4" />
                            <span>{property.parking}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {property.price_guide && (
                          <span className="font-semibold">
                            ${property.price_guide.toLocaleString()}
                          </span>
                        )}
                        <Badge>{property.listing_status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};