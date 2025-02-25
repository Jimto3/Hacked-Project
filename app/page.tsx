import { Card } from "@/components/ui/card";
import { PlotCard } from "@/components/plot-card";
import { MoistureGauge } from "@/components/moisture-gauge";
import { WeatherCard } from "@/components/weather-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E5E7E6]">
      <header className="bg-[#A4B494] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">GrowBase</h1>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-black underline">Dashboard</a>
            <a href="#" className="text-black">Live View</a>
            <Button variant="secondary" className="bg-[#F5E6D3] hover:bg-[#E5D6C3]">Log In</Button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PlotCard
          plotName="Cabbage Patch"
          contents="Cabbage"
          location="The Broads"
          suggestion="It's overcast but due to rain, a good balance of sun and moisture, no maintenance need today."
          status="good"
        />
        
        <div className="space-y-6">
          <MoistureGauge
            title="Soil Moisture"
            value={75}
            icon="sprout"
            className="bg-[#D8CFBF]"
          />
          <MoistureGauge
            title="Atmosphere Moisture"
            value={45}
            icon="cloud-sun"
            className="bg-[#F5E6D3]"
          />
        </div>

        <WeatherCard/>
      </main>
    </div>
  );
}