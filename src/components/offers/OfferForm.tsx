import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OfferFormProps {
  listingId: string;
  onSuccess?: () => void;
}

interface OfferFormData {
  amount: number;
  financeDays: number;
  buildingPestDays: number;
  specialConditions: string;
}

export const OfferForm = ({ listingId, onSuccess }: OfferFormProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<OfferFormData>();

  const onSubmit = async (data: OfferFormData) => {
    try {
      const { error } = await supabase.from('property_offers').insert({
        listing_id: listingId,
        amount: data.amount,
        finance_days: data.financeDays,
        building_pest_days: data.buildingPestDays,
        special_conditions: data.specialConditions ? [data.specialConditions] : [],
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Offer Submitted",
        description: "Your offer has been successfully submitted.",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Offer Amount</label>
          <Input
            type="number"
            {...register("amount", { required: true, min: 0 })}
            className="w-full"
          />
          {errors.amount && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Finance Days</label>
          <Input
            type="number"
            {...register("financeDays", { required: true, min: 0 })}
            className="w-full"
            defaultValue={21}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Building & Pest Days</label>
          <Input
            type="number"
            {...register("buildingPestDays", { required: true, min: 0 })}
            className="w-full"
            defaultValue={21}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Special Conditions</label>
          <Input
            {...register("specialConditions")}
            className="w-full"
            placeholder="Enter any special conditions"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Offer
        </Button>
      </form>
    </Card>
  );
};