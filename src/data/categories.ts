// src/data/categories.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: 9, name: "General Knowledge", slug: "general-knowledge" },
  {
    id: 15,
    name: "Entertainment: Video Games",
    slug: "entertainment-video-games",
  },
  {
    id: 31,
    name: "Entertainment: Anime & Manga",
    slug: "entertainment-anime-manga",
  },
  {
    id: 32,
    name: "Entertainment: Cartoon & Animations",
    slug: "entertainment-cartoon-animations",
  },
  // Tambahkan kategori lainnya sesuai kebutuhan
];
