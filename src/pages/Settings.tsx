import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Agent Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-assign">Auto-assign tasks to agents</Label>
              <Switch id="auto-assign" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable notifications</Label>
              <Switch id="notifications" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};