import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const mediaUrl = z
  .string()
  .url()
  .regex(/^https:\/\/media\.albertbiney\.com\/(stills|moving-images)\//);

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
    coverImage: mediaUrl,
    client: z.string().optional(),
    credits: z
      .array(
        z.object({
          role: z.string(),
          name: z.string(),
        })
      )
      .optional(),
    images: z.array(mediaUrl),
    videos: z
      .array(
        z.object({
          title: z.string().optional(),
          previewUrl: mediaUrl.optional(),
          fullVideoUrl: mediaUrl.optional(),
          streamUrl: mediaUrl.optional(),
          posterImage: mediaUrl.optional(),
        })
      )
      .optional(),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: mediaUrl,
    }),
  }),
});

export const collections = {
  projects,
};
