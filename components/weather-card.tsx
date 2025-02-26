"use client";

import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudSun, Thermometer } from "lucide-react";
import { useWeatherData } from "./weatherData";

export function WeatherCard() {
  const { weatherData, loading, error } = useWeatherData();

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

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="p-6 bg-[#E8F4F8] shadow-lg h-auto flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Weather</h2>
        </div>
        {weatherIcons["sunny"]}
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <h3 className="text-2xl font-bold">Norwich</h3>
          <p className="text-xl">Daily Forecast</p>
        </div>

        <div className="overflow-y-auto pr-2 h-72 pb-2">
          {weatherData?.hourly.time.map((time, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-2xl shadow-md bg-white mb-2"
            >
              <div>
                <p><strong>Time:</strong> {time.toLocaleString()}</p>
                <p><strong>Temperature:</strong> {Math.round(weatherData.hourly.temperature2m[index])}°C</p>
                <p><strong>Precipitation:</strong> {weatherData.hourly.precipitation[index]} mm</p>
              </div>
              <Thermometer className="h-8 w-8" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default WeatherCard;