"use client";

import dynamic from "next/dynamic";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Variation, ProjectDimensions } from "@/lib/variations";
import { ShowerSketchPdf } from "@/components/pdf-document";

const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <Button size="sm" disabled className="gap-2">
                <Download className="h-4 w-4" /> Зареждане PDF...
            </Button>
        ),
    }
);

interface PDFDownloadButtonProps {
    projectName: string;
    variation: Variation;
    dimensions: ProjectDimensions;
    notes?: string;
    subVariant?: string;
}

export function PDFDownloadButton({
    projectName,
    variation,
    dimensions,
    notes,
    subVariant,
}: PDFDownloadButtonProps) {
    return (
        <PDFDownloadLink
            document={
                <ShowerSketchPdf
                    projectName={projectName}
                    variation={variation}
                    dimensions={dimensions}
                    notes={notes}
                    subVariant={subVariant}
                />
            }
            fileName={`${projectName.replace(/\s+/g, "_")}_Sketch.pdf`}
        >
            {({ blob, url, loading, error }) => (
                <Button size="sm" className="gap-2" disabled={loading}>
                    <Download className="h-4 w-4" />
                    {loading ? "Генериране..." : "Изтегли PDF"}
                </Button>
            )}
        </PDFDownloadLink>
    );
}
