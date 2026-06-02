import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const mediaPath = z.string().regex(/^\/(images\/stills|moving)\//);

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
    coverImage: mediaPath,
    client: z.string().optional(),
    credits: z
      .array(
        z.object({
          role: z.string(),
          name: z.string(),
        })
      )
      .optional(),
    images: z.array(mediaPath),
    videos: z
      .array(
        z.object({
          title: z.string().optional(),
          previewUrl: mediaPath.optional(),
          fullVideoUrl: mediaPath.optional(),
          streamUrl: mediaPath.optional(),
          posterImage: mediaPath.optional(),
        })
      )
      .optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: mediaPath,
    }),
  }),
});

export const collections = {
  projects,
};
