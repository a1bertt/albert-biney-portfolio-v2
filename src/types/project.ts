export type Credit = {
  role: string;
  name: string;
};

export type Project = {
  title: string;
  slug: string;
  year: string;

  category: "stills" | "moving-image";

  sortOrder: number;

  coverImage: string;

  featured: boolean;

  client?: string;

  credits?: Credit[];

  images: string[];

  description?: string;

  ogImage?: string;
};