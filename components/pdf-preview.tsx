"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { ShowerSketchPdf } from "@/components/pdf-document";
import { Variation, ProjectDimensions } from "@/lib/variations";

interface PdfPreviewProps {
    projectName: string;
    variation: Variation;
    dimensions: ProjectDimensions;
    notes?: string;
}

export default function PdfPreview({ projectName, variation, dimensions, notes }: PdfPreviewProps) {
    return (
        <PDFViewer width="100%" height="100%" className="w-full h-full border-none">
            <ShowerSketchPdf
                projectName={projectName}
                variation={variation}
                dimensions={dimensions}
                notes={notes}
            />
        </PDFViewer>
    );
}
