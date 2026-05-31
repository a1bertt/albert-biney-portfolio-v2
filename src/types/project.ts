export type Credit = {
  role: string;
  name: string;
};

export type Video = {
  title?: string;
  streamUrl: string;
  posterImage?: string;
};

export type Seo = {
  title: string;
  description: string;
  ogImage: string;
};

export type Project = {
  title: string;
  slug: string;
  year: string;

  category: "stills" | "moving-image";

  sortOrder: number;

  coverImage: string;

  client?: string;

  credits?: Credit[];

  images: string[];

  videos?: Video[];

  seo: Seo;
};
