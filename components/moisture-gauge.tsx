"use client";

import { Card } from "@/components/ui/card";
import { Sprout, CloudSun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MoistureGaugeProps {
  title: string;
  value: number;
  icon: "sprout" | "cloud-sun";
  className?: string;
  over: number;
  under: number;
  /**
   * The gauge’s minimum and maximum values.
   * Defaults to 0 and 100 if not provided.
   */
  minValue?: number;
  maxValue?: number;
}

const RADIUS = 80;
const CIRCUMFERENCE = Math.PI * RADIUS;

// Helper to clamp a number between two values
function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function MoistureGauge({
  title,
  value = 0,
  over,
  under,
  icon,
  className,
  minValue = 0,
  maxValue = 100,
}: MoistureGaugeProps) {
  const icons = {
    sprout: Sprout,
    "cloud-sun": CloudSun,
  };

  const Icon = icons[icon];

  // Normalize 'value' to a fraction between 0 and 1
  const fraction = (value - minValue) / (maxValue - minValue);
  const clampedFraction = clamp(fraction, 0, 1);

  // Calculate arc offset for the 'colored' portion
  const arcOffset = CIRCUMFERENCE - clampedFraction * CIRCUMFERENCE;

  // Needle angle from -90° (left) to +90° (right)
  const minAngle = -90;
  const maxAngle = 90;
  const rotation = minAngle + (maxAngle - minAngle) * clampedFraction;

  return (
    <Card className={cn("p-6 shadow-lg", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <Icon className="h-6 w-6" />
      </div>

      <svg
        width={200}
        height={120}
        viewBox="0 0 200 120"
        style={{ overflow: "visible" }}
      >
        {/* Grey background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#ccc"
          strokeWidth="30"
        />

        {/* Dynamic arc to show the 'filled' portion */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={
            (value < under && "#2196F3") ||
            (value > over && "#F44336") ||
            "#4CAF50"
          }
          strokeWidth="30"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={0}
          animate={{
            strokeDashoffset: arcOffset,
          }}
          transition={{
            type: "tween",
            duration: 0.5,
          }}
        />

        {/* Needle (pointer) */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="60"
          stroke="black"
          strokeWidth="4"
          animate={{ rotate: rotation, originY: 1 }}
          transition={{ type: "linear" }}
        />
      </svg>
    </Card>
  );
}
