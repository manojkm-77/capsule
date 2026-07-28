"use client";

import { MapPin, Plus } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function AddressesPage() {
  const addresses: string[] = [];

  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Addresses" }]} />
      <div className="flex items-center justify-between mt-6">
        <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">My Addresses</h1>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" strokeWidth={1.8} /> Add New
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* addresses would map here */}
        </div>
      ) : (
        <EmptyState
          icon={<MapPin className="h-16 w-16" strokeWidth={1.8} />}
          title="No addresses saved"
          description="Add a shipping address for faster checkout."
          action={{ label: "Add Address" }}
        />
      )}
    </div>
  );
}
