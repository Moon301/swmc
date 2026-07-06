import { createClient } from "./client";

type Bucket =
  | "banners"
  | "popups"
  | "sermons"
  | "news"
  | "gallery"
  | "bulletins"
  | "pages";

export async function uploadFile(
  bucket: Bucket,
  file: File,
  path?: string
): Promise<string> {
  const supabase = createClient();
  const fileName = path || `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: true });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteFile(bucket: Bucket, path: string) {
  const supabase = createClient();
  const url = new URL(path);
  const filePath = url.pathname.split(`/storage/v1/object/public/${bucket}/`)[1];
  if (!filePath) return;

  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  if (error) throw error;
}
