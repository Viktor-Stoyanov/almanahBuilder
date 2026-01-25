"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { VARIATIONS } from "@/lib/variations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

export default function NewProjectPage() {
    const router = useRouter();
    const { createProject } = useProjects();
    const [projectName, setProjectName] = useState("");
    const [selectedVariationId, setSelectedVariationId] = useState<string | null>(null);

    const handleCreate = () => {
        if (!selectedVariationId) return; // Should not happen if button is disabled
        const finalName = projectName.trim() || `Project ${new Date().toLocaleDateString()}`;
        const project = createProject(finalName, selectedVariationId);
        router.push(`/project/${project.id}`);
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Създай Нов Проект</h1>
                    <p className="text-muted-foreground">
                        Избери вариант и именувай своя проект.
                    </p>
                </div>
            </div>

            <div className="max-w-xl mb-10">
                <Label htmlFor="projectName" className="text-lg font-medium mb-2 block">
                    Име на Проекта
                </Label>
                <div className="flex gap-4">
                    <Input
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="напр. Ремонт на баня"
                        className="h-12 text-lg"
                    />
                    <Button
                        size="lg"
                        onClick={handleCreate}
                        disabled={!selectedVariationId}
                        className="w-32"
                    >
                        Създай
                    </Button>
                </div>
                {selectedVariationId && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Готов за създаване с вариант <strong>{VARIATIONS.find(v => v.id === selectedVariationId)?.name}</strong>
                    </p>
                )}
                {!selectedVariationId && (
                    <p className="text-sm text-muted-foreground mt-2">
                        Моля изберете вариант по-долу, за да продължите.
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {VARIATIONS.map((variation) => (
                    <Card
                        key={variation.id}
                        onClick={() => setSelectedVariationId(variation.id)}
                        className={cn(
                            "cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]",
                            selectedVariationId === variation.id
                                ? "ring-2 ring-primary border-primary bg-primary/5"
                                : "hover:border-primary/50"
                        )}
                    >
                        <div className="aspect-[4/5] p-6 flex items-center justify-center bg-white relative overflow-hidden rounded-t-xl group">
                            <img
                                src={variation.previewImage}
                                alt={variation.name}
                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                            />
                            {selectedVariationId === variation.id && (
                                <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                        <CardHeader className="p-4 border-t">
                            <CardTitle className="text-sm font-semibold leading-tight line-clamp-2 min-h-[2.5rem]">
                                {variation.name}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
