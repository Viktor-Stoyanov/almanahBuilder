"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProjectDimensions, VARIATIONS } from "@/lib/variations";

export type Project = {
    id: string;
    name: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    variationId: string;
    dimensions: ProjectDimensions;
};

const STORAGE_KEY = "almanah-projects";

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Load projects from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setProjects(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse projects", e);
            }
        }
        setLoading(false);
    }, []);

    // Save projects to local storage whenever they change
    const saveProjects = (newProjects: Project[]) => {
        setProjects(newProjects);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
    };

    const createProject = (name: string, variationId: string) => {
        const variation = VARIATIONS.find(v => v.id === variationId);
        const initialDimensions: ProjectDimensions = {};

        if (variation) {
            variation.inputs.forEach(input => {
                if (input.defaultValue !== undefined) {
                    initialDimensions[input.id] = input.defaultValue;
                }
            });
        }

        const newProject: Project = {
            id: uuidv4(),
            name,
            notes: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            variationId,
            dimensions: initialDimensions,
        };
        saveProjects([newProject, ...projects]);
        return newProject;
    };

    const updateProject = (id: string, updates: Partial<Omit<Project, "id" | "createdAt">>) => {
        const newProjects = projects.map((p) =>
            p.id === id
                ? { ...p, ...updates, updatedAt: new Date().toISOString() }
                : p
        );
        saveProjects(newProjects);
    };

    const deleteProject = (id: string) => {
        const newProjects = projects.filter((p) => p.id !== id);
        saveProjects(newProjects);
    };

    const getProject = (id: string) => projects.find((p) => p.id === id);

    return {
        projects,
        loading,
        createProject,
        updateProject,
        deleteProject,
        getProject,
    };
}
