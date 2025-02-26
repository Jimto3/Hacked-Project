"use client";
import { Card } from "@/components/ui/card";
import { PlotCard } from "@/components/plot-card";
import { MoistureGauge } from "@/components/moisture-gauge";
import { WeatherCard } from "@/components/weather-card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const { data: sensors, error } = await supabase
        .from("sensors")
        .select("*")
        .eq("user_id", 1);

      if (sensors) {
        setData(() => sensors[0]);
      }
    };

    const channel = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "sensors" },
        (payload) => {
          console.log("INSERT event received:", payload);
          // Option A: Re-fetch entire table
          getData();

          // Option B: Just append new row to local state
          // setData((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    // Cleanup: remove channel when component unmounts
    getData();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#E5E7E6]">
      <header className="bg-[#A4B494] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">GrowBase</h1>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-black underline">
              Dashboard
            </a>
            <a href="#" className="text-black">
              Live View
            </a>
            <Button
              variant="secondary"
              className="bg-[#F5E6D3] hover:bg-[#E5D6C3]"
            >
              Log In
            </Button>
          </nav>
        </div>
      </header>

      {/* -------------------------------------------------Plot 1---------------------------------------------------- */}

      <div className="max-w-7xl mx-auto p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PlotCard
          plotName="Cabbage Patch"
          contents="Cabbage"
          location="The Broads"
          suggestion="It's overcast but due to rain, a good balance of sun and moisture, no maintenance need today."
          status="good"
          data={data}
        />

        <div className="space-y-6">
          <MoistureGauge
            title="Soil Moisture"
            value={data && data.humidity}
            icon="sprout"
            className="bg-[#D8CFBF]"
            over={60}
            under={30}
            minValue={15}
            maxValue={80}
          />

          <MoistureGauge
            title="Temperature"
            value={data && data.temperature - 10}
            icon="cloud-sun"
            className="bg-[#F5E6D3]"
            over={30}
            under={15}
            minValue={0}
            maxValue={40}
          />
        </div>

        <WeatherCard
          location="Norwich, Norfolk"
          day="Monday"
          temperature={22}
          fahrenheit={71.6}
          condition="partly-cloudy"
        />
      </div>

      {/* -------------------------------------------------Plot 2---------------------------------------------------- */}

      <div className="max-w-7xl mx-auto p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PlotCard
          plotName="Potato Patch"
          contents="Potato"
          location="The Broads"
          suggestion="It's overcast but due to rain, a good balance of sun and moisture, no maintenance need today."
          status="good"
          data={{ light: 80 }}
        />

        <div className="space-y-6">
          <MoistureGauge
            title="Soil Moisture"
            value={20}
            icon="sprout"
            className="bg-[#D8CFBF]"
            over={60}
            under={30}
            minValue={15}
            maxValue={80}
          />
          <MoistureGauge
            title="Temperature"
            value={25}
            icon="cloud-sun"
            className="bg-[#F5E6D3]"
            over={30}
            under={15}
            minValue={0}
            maxValue={40}
          />
        </div>

        <WeatherCard
          location="Norwich, Norfolk"
          day="Monday"
          temperature={22}
          fahrenheit={71.6}
          condition="partly-cloudy"
        />
      </div>
    </div>
  );
}
