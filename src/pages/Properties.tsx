import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle, Home } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface PropertyListing {
  id: string;
  address: string;
  seller_name: string;
  price_guide: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  land_size: number | null;
  listing_status: string;
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
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Home className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold truncate">{property.address}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {property.seller_name}
                        </p>
                        {property.price_guide && (
                          <p className="text-sm font-medium mt-2">
                            ${property.price_guide.toLocaleString()}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {property.bedrooms && (
                            <Badge variant="secondary">{property.bedrooms} beds</Badge>
                          )}
                          {property.bathrooms && (
                            <Badge variant="secondary">{property.bathrooms} baths</Badge>
                          )}
                          {property.parking && (
                            <Badge variant="secondary">{property.parking} parking</Badge>
                          )}
                          {property.land_size && (
                            <Badge variant="secondary">{property.land_size}m²</Badge>
                          )}
                        </div>
                        <Badge 
                          className="mt-2" 
                          variant={property.listing_status === 'active' ? 'default' : 'secondary'}
                        >
                          {property.listing_status}
                        </Badge>
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