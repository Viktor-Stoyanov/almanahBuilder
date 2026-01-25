"use client";

import { useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useProjects } from "@/hooks/use-projects";
import { VARIATIONS } from "@/lib/variations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
// import { SketchCanvas } from "@/components/sketch-canvas"; // Unused now
import { PDFDownloadButton } from "@/components/pdf-download-button";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const PdfPreview = dynamic(() => import("@/components/pdf-preview"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-muted-foreground">Зареждане на PDF...</div>
});

export default function ProjectEditor() {
    const params = useParams();
    const id = params?.id as string;
    const { getProject, updateProject, loading } = useProjects();

    const project = getProject(id);
    const variation = project ? VARIATIONS.find((v) => v.id === project.variationId) : null;

    if (loading) return <div>Зареждане...</div>;
    if (!project || !variation) return <div>Проекта не е намерен</div>;

    const handleDimensionChange = (key: string, value: string) => {
        const numValue = parseFloat(value);
        updateProject(id, {
            dimensions: {
                ...project.dimensions,
                [key]: isNaN(numValue) ? 0 : numValue,
            },
        });
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="border-b bg-background px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="font-semibold text-lg">{project.name}</h1>
                        <p className="text-sm text-muted-foreground">{variation.name}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {/* Auto-save is implemented, but a manual button is reassuring */}
                    <Button variant="outline" size="sm" className="gap-2">
                        <Save className="h-4 w-4" /> Запазен
                    </Button>
                    <PDFDownloadButton
                        projectName={project.name}
                        variation={variation}
                        dimensions={project.dimensions}
                        notes={project.notes}
                    />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <aside className="w-80 border-r bg-muted/10 p-6 overflow-y-auto">
                    <h3 className="font-medium mb-4">Размери</h3>

                    <div className="mb-6 border rounded-lg overflow-hidden bg-white">
                        <img
                            src={variation.dimensionsImage}
                            alt="Dimensions Schematic"
                            className="w-full h-auto object-contain"
                        />
                        <p className="text-xs text-center text-muted-foreground p-2 bg-muted/50">
                            Референтна Диаграма
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {variation.inputs.map((input) => (
                            <div key={input.id} className="grid gap-2">
                                <Label htmlFor={input.id}>{input.label}</Label>
                                <div className="relative">
                                    <Input
                                        id={input.id}
                                        type="number"
                                        value={project.dimensions[input.id] ?? input.defaultValue ?? ""}
                                        onChange={(e) => handleDimensionChange(input.id, e.target.value)}
                                        className="pr-8"
                                    />
                                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                                        mm
                                    </span>
                                </div>
                            </div>
                        ))}

                        <Separator className="my-2" />

                        <div className="grid gap-2">
                            <Label htmlFor="notes">Бележки</Label>
                            <Textarea
                                id="notes"
                                placeholder="Добави бележки към проекта тук..."
                                value={project.notes || ""}
                                onChange={(e) => updateProject(id, { notes: e.target.value })}
                            />
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <h3 className="font-medium mb-4">Детайли за Варианта</h3>
                    <div className="text-sm text-muted-foreground">
                        <p className="mb-2">Тип: {variation.name}</p>
                        {/* Future: Add more details or variation switching */}
                    </div>
                </aside>

                {/* Canvas Area */}
                <main className="flex-1 bg-muted/20 p-8 flex items-center justify-center relative overflow-hidden">
                    <Card className="w-full h-full bg-white shadow-lg relative overflow-hidden ring-1 ring-border">
                        <PdfPreview
                            projectName={project.name}
                            variation={variation}
                            dimensions={project.dimensions}
                            notes={project.notes}
                        />
                    </Card>
                </main>
            </div>
        </div>
    );
}
