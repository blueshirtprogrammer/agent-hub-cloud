import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Properties = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Properties</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>123 Ocean View Drive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Sunshine Coast, QLD
              </p>
              <p className="text-sm">
                4 bed, 2 bath, 2 car
              </p>
              <p className="font-semibold">
                $850,000
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};