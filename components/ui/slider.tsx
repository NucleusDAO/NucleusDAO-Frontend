"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/libs/utils"

interface SliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  thumbClassName?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, thumbClassName, ...props }, ref) =>(
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full dark:bg-secondary bg-[#D9D9D980]">
      <SliderPrimitive.Range className="absolute h-full bg-primary rounded-lg" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn("block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", thumbClassName)} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
