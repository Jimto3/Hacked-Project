"use client";

import { Card } from "@/components/ui/card";
import { DivideIcon as LucideIcon, Sprout, CloudSun } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoistureGaugeProps {
  title: string;
  value: number;
  icon: "sprout" | "cloud-sun";
  className?: string;
}

export function MoistureGauge({ title, value, icon, className }: MoistureGaugeProps) {
  const icons = {
    "sprout": Sprout,
    "cloud-sun": CloudSun,
  };

  const Icon = icons[icon];
  const rotation = (value / 100) * 180 - 90;

  return (
    <Card className={cn("p-6 shadow-lg", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Icon className="h-6 w-6" />
      </div>

      <div className="relative w-full aspect-[2/1]">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full bg-blue-300 rounded-t-full origin-bottom transform-gpu transition-transform duration-1000"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          />
        </div>
        <div
          className="absolute bottom-0 left-1/2 w-1 h-1/2 bg-gray-800 rounded-full origin-bottom transform -translate-x-1/2"
          style={{
            transform: `translateX(-50%) rotate(${rotation}deg)`,
          }}
        />
      </div>
    </Card>
  );
}