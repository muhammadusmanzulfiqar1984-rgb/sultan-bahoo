export interface Book {
  id: string;
  title: string;
  description: string;
  language: 'English' | 'Urdu' | 'Punjabi' | 'Arabic';
  pdfUrl: string;
  coverImage: string;
}

export interface KalamVerse {
  id: string;
  punjabi: string;
  urdu: string;
  english: string;
  audioUrl?: string;
  theme: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats: string;
}
