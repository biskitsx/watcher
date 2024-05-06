import { cn } from "@/util/cn";
import { useEffect, useState } from "react";

interface RadialProgressProps {
  value: number;
  className?: string;
}

const calculateColor = (value: number): string => {
  value = Math.round(value);
  const red = Math.round(((100 - value) * 255) / 100);
  const green = Math.round((value * 255) / 100);
  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  return `#${redHex}${greenHex}00`;
};

export const RadialProgress = ({ value, className }: RadialProgressProps) => {
  const [cssColor, setCssColor] = useState<string>("");
  const [roundedValue, setRoundedValue] = useState<number>(Math.round(value));

  useEffect(() => {
    setRoundedValue(Math.round(value));
    const color = calculateColor(roundedValue);
    setCssColor(color);
  }, [value]);

  return (
    <div
      className={cn(
        `radial-progress bg-black border-2 border-black text-[10px] font-bold`,
        className
      )}
      style={
        {
          "--value": roundedValue,
          "--size": "32px",
          "--thickness": "2px",
          color: cssColor,
        } as React.CSSProperties
      }
      role="progressbar"
    >
      <span className="text-white">{roundedValue}%</span>
    </div>
  );
};
