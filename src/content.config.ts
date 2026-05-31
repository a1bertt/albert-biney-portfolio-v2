import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const remoteUrl = z.string().url();

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
    coverImage: remoteUrl,
    client: z.string().optional(),
    credits: z
      .array(
        z.object({
          role: z.string(),
          name: z.string(),
        })
      )
      .optional(),
    images: z.array(remoteUrl),
    videos: z
      .array(
        z.object({
          title: z.string().optional(),
          previewUrl: remoteUrl.optional(),
          fullVideoUrl: remoteUrl.optional(),
          streamUrl: remoteUrl.optional(),
          posterImage: remoteUrl.optional(),
        })
      )
      .optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: remoteUrl,
    }),
  }),
});

export const collections = {
  projects,
};
