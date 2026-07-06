export type UserRole = "admin" | "member";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Banner {
  id: string;
  title: string;
  image_url: string;
  mobile_image_url: string | null;
  link_url: string | null;
  display_order: number;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Popup {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  link_url: string | null;
  is_active: boolean;
  show_today_close: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_key: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  scripture: string | null;
  youtube_video_id: string;
  sermon_date: string;
  sermon_type: string;
  description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorshipService {
  id: string;
  name: string;
  day_of_week: string;
  time: string;
  location: string | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: "notice" | "news" | "event";
  is_pinned: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  date: string | null;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  photos?: GalleryPhoto[];
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export interface Bulletin {
  id: string;
  title: string;
  bulletin_date: string;
  pdf_url: string | null;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}
