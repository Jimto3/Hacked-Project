"use client";

import { Card } from "@/components/ui/card";
import { Sprout, Frown, Meh, Smile } from "lucide-react";
import { useEffect } from "react";

interface PlotCardProps {
  plotName: string;
  contents: string;
  location: string;
  suggestion: string;
  status: "bad" | "neutral" | "good";
  data: any;
}

export function PlotCard({
  plotName,
  contents,
  location,
  suggestion,
  status,
  data,
}: PlotCardProps) {
  const statusIcons = {
    bad: <Frown className="text-red-400" />,
    neutral: <Meh className="text-gray-400" />,
    good: <Smile className="text-green-600" />,
  };

  useEffect(() => {
    const getAiData = async () => {
      if (data) {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });
        const json = await response.json();
        console.log(json);
      }
    };

    getAiData();
  }, []);

  return (
    <Card className="p-6 bg-[#E8F3E8] shadow-lg relative">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold mb-1">Plot Name:</h3>
          <p className="text-2xl font-bold mb-4">{plotName}</p>
        </div>
        <Sprout className="h-6 w-6" />
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Contents:</h3>
          <p className="text-xl">{contents}</p>
        </div>

        <div>
          <h3 className="font-semibold">Location:</h3>
          <p className="text-xl">{location}</p>
        </div>

        <div>
          <h3 className="font-semibold">Suggestions:</h3>
          <p className="text-base">{suggestion}</p>
        </div>

        <div className="flex gap-2 mt-4">
          <div className={`opacity-${status === "bad" ? "100" : "30"}`}>
            {statusIcons.bad}
          </div>
          <div className={`opacity-${status === "neutral" ? "100" : "30"}`}>
            {statusIcons.neutral}
          </div>
          <div className={`opacity-${status === "good" ? "100" : "30"}`}>
            {statusIcons.good}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center absolute bottom-8 left-0 text-xl font-semibold">
        {(data && data.light < 100 && (
          <h4 className="text-[#0D47A1]">Low Light</h4>
        )) ||
          (data && data.light > 200 && (
            <h4 className="text-[#4CAF50]">Medium Light</h4>
          )) || <h4 className="text-[#FFC107]">High Light</h4>}
      </div>
    </Card>
  );
}
