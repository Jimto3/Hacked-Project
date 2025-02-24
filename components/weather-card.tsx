"use client";

import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudSun, Thermometer } from "lucide-react";

interface WeatherCardProps {
  location: string;
  day: string;
  temperature: number;
  fahrenheit: number;
  condition: "sunny" | "cloudy" | "partly-cloudy";
}

export function WeatherCard({ location, day, temperature, fahrenheit, condition }: WeatherCardProps) {
  const weatherIcons = {
    sunny: <Sun className="h-16 w-16 text-yellow-400" />,
    cloudy: <Cloud className="h-16 w-16 text-blue-400" />,
    "partly-cloudy": (
      <div className="relative">
        <Cloud className="h-16 w-16 text-blue-300" />
        <Sun className="h-12 w-12 text-yellow-400 absolute -right-4 -top-2" />
      </div>
    ),
  };

  return (
    <Card className="p-6 bg-[#E8F4F8] shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Weather</h2>
        </div>
        {weatherIcons[condition]}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold">{location}</h3>
          <p className="text-xl">{day}</p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-4xl font-bold">{temperature}°</p>
            <p className="text-xl">{fahrenheit} F</p>
          </div>
          <Thermometer className="h-8 w-8" />
        </div>
      </div>
    </Card>
  );
}