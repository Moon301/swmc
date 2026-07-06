"use client";

import { useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { uploadFile } from "@/lib/supabase/storage";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import type { GalleryAlbum } from "@/types";

export default function AdminGalleryPage() {
  const supabase = useSupabase();
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryAlbum | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const fetchAlbums = async () => {
    const { data } = await supabase
      .from("gallery_albums")
      .select("*, gallery_photos(count)")
      .order("created_at", { ascending: false });
    setAlbums(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setDescription("");
    setCoverImageUrl("");
    setModalOpen(true);
  };

  const openEdit = (album: GalleryAlbum) => {
    setEditing(album);
    setTitle(album.title);
    setDescription(album.description || "");
    setCoverImageUrl(album.cover_image_url || "");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!title) {
      toast.error("제목은 필수입니다.");
      return;
    }

    setSaving(true);
    const payload = {
      title,
      description: description || null,
      cover_image_url: coverImageUrl || null,
    };

    if (editing) {
      const { error } = await supabase
        .from("gallery_albums")
        .update(payload)
        .eq("id", editing.id);
      if (error) { toast.error("수정 실패"); setSaving(false); return; }
      toast.success("앨범이 수정되었습니다.");
    } else {
      const { data, error } = await supabase.from("gallery_albums").insert(payload).select().single();
      if (error) { toast.error("등록 실패"); setSaving(false); return; }
      toast.success("앨범이 등록되었습니다.");
      setSelectedAlbum(data);
    }

    setSaving(false);
    setModalOpen(false);
    fetchAlbums();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("앨범과 모든 사진이 삭제됩니다. 계속하시겠습니까?")) return;
    await supabase.from("gallery_photos").delete().eq("album_id", id);
    const { error } = await supabase.from("gallery_albums").delete().eq("id", id);
    if (error) { toast.error("삭제 실패"); return; }
    toast.success("앨범이 삭제되었습니다.");
    if (selectedAlbum?.id === id) setSelectedAlbum(null);
    fetchAlbums();
  };

  const onDropPhotos = useCallback(
    async (acceptedFiles: File[]) => {
      if (!selectedAlbum) return;
      setUploading(true);
      try {
        for (const file of acceptedFiles) {
          const url = await uploadFile("gallery", file, `${selectedAlbum.id}/${Date.now()}-${file.name}`);
          await supabase.from("gallery_photos").insert({
            album_id: selectedAlbum.id,
            image_url: url,
          });
        }
        toast.success(`${acceptedFiles.length}장 업로드 완료`);
      } catch {
        toast.error("업로드 실패");
      } finally {
        setUploading(false);
      }
    },
    [selectedAlbum, supabase]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropPhotos,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    disabled: !selectedAlbum,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">갤러리 관리</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          앨범 추가
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Album List */}
        <div>
          <h2 className="mb-3 font-semibold">앨범 목록</h2>
          {loading ? (
            <p className="text-muted-foreground">로딩 중...</p>
          ) : albums.length === 0 ? (
            <p className="text-muted-foreground">등록된 앨범이 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                    selectedAlbum?.id === album.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{album.title}</p>
                      <p className="text-xs text-muted-foreground">{album.description}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openEdit(album); }}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(album.id); }}>
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <h2 className="mb-3 font-semibold">
            사진 업로드 {selectedAlbum && `- ${selectedAlbum.title}`}
          </h2>
          {selectedAlbum ? (
            <div
              {...getRootProps()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center hover:border-primary/50 hover:bg-muted/50"
            >
              <input {...getInputProps()} />
              <Upload className="h-10 w-10 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                {uploading ? "업로드 중..." : "사진을 드래그하거나 클릭하여 업로드"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">여러 장 동시 업로드 가능</p>
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              왼쪽에서 앨범을 선택하세요.
            </p>
          )}
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "앨범 수정" : "앨범 추가"}
      >
        <div className="space-y-4">
          <Input label="앨범 제목" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="앨범 제목" />
          <Textarea label="설명 (선택)" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="앨범 설명..." />
          <div>
            <label className="mb-1 block text-sm font-medium">커버 이미지 (선택)</label>
            <ImageUploader bucket="gallery" value={coverImageUrl} onChange={setCoverImageUrl} aspectRatio="4/3" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
            <Button onClick={handleSave} loading={saving}>{editing ? "수정" : "등록"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
