import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const programs = defineCollection({
  loader: glob({ base: "./src/content/programs", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    degree: z.enum(["language", "foundation", "bachelor", "master", "phd"]),
    summary: z.string(),
    duration: z.string(),
    languages: z.array(z.enum(["zh", "en"])).min(1),
    tuition: z.string(),
    overview: z.array(z.string()).min(1),
    fitFor: z.array(z.string()).min(1),
    outcomes: z.array(z.string()).min(1),
    timeline: z
      .array(
        z.object({
          step: z.string(),
          text: z.string(),
        }),
      )
      .min(1),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const universities = defineCollection({
  loader: glob({ base: "./src/content/universities", pattern: "**/*.json" }),
  schema: z.object({
    name: z.string(),
    nameZh: z.string(),
    city: z.string(),
    province: z.string(),
    type: z.enum(["public", "vocational"]),
    founded: z.number().optional(),
    strengths: z.array(z.string()).min(1),
    levels: z
      .array(z.enum(["language", "foundation", "bachelor", "master", "phd", "vocational"]))
      .min(1),
    language: z.string(),
    scholarship: z.boolean(),
    note: z.string(),
    officialUrl: z.url(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const faq = defineCollection({
  loader: glob({ base: "./src/content/faq", pattern: "**/*.json" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.enum(["admission", "money", "language", "life", "documents"]),
    order: z.number(),
    home: z.boolean().default(false),
  }),
});

export const collections = { programs, universities, faq };
