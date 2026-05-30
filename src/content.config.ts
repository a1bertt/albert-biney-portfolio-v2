import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    year: z.string(),
    category: z.enum(["stills", "moving-image"]),
    sortOrder: z.number(),
    coverImage: z.string(),
    featured: z.boolean(),
    client: z.string().optional(),
    credits: z
      .array(
        z.object({
          role: z.string(),
          name: z.string(),
        })
      )
      .optional(),
    images: z.array(z.string()),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = {
  projects,
};