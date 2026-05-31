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
    videos: z
      .array(
        z.object({
          title: z.string().optional(),
          streamUrl: z.string(),
          posterImage: z.string().optional(),
        })
      )
      .optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.string(),
    }),
  }),
});

export const collections = {
  projects,
};
