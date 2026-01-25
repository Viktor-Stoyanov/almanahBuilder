"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Plus, FolderOpen, Trash2, FileText } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { VARIATIONS } from "@/lib/variations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const router = useRouter();
  const { projects, loading, deleteProject } = useProjects();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Моите Проекти</h1>
        </div>

        <Link href="/project/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Нов Проект
          </Button>
        </Link>
      </div>

      {loading ? (
        <div>Зареждане...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>Няма намерени проекти.</p>
          <p>Създай първия си проект като натиснеш бутона "Нов Проект".</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Reverse projects to show newest first */}
          {[...projects].reverse().map((project) => (
            <Card key={project.id} className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {new Date(project.updatedAt).toLocaleDateString('bg-BG')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {VARIATIONS.find(v => v.id === project.variationId)?.name || 'Unknown Variation'}
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                <Link href={`/project/${project.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" /> Редакция
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    if (confirm('Сигурни ли сте, че искате да изтриете този проект?')) {
                      deleteProject(project.id);
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

