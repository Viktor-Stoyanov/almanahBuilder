"use client";

import { useMemo } from "react";
import { Variation, ProjectDimensions } from "@/lib/variations";
import { cn } from "@/lib/utils";

interface SketchCanvasProps {
    variation: Variation;
    dimensions: ProjectDimensions;
    className?: string;
}

export function SketchCanvas({ variation, dimensions, className }: SketchCanvasProps) {
    // Safe accessor for dimensions
    const getValue = (id: string) => dimensions[id] || 0;

    return (
        <div className={cn("relative w-full h-full bg-white select-none", className)}>
            {/* Background Template Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={variation.templateImage}
                    alt="Template"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Dimension Labels */}
            {variation.inputs.map((input) => {
                const coord = variation.labels?.[input.id];
                if (!coord) return null;

                return (
                    <div
                        key={input.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 bg-white/80 px-1 rounded shadow-sm border border-blue-200"
                        style={{
                            left: `${coord.x}%`,
                            top: `${coord.y}%`,
                            transform: `translate(-50%, -50%) rotate(${coord.rotation || 0}deg)`,
                        }}
                    >
                        {getValue(input.id)}
                    </div>
                );
            })}
        </div>
    );
}
