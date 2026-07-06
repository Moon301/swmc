"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, GripVertical } from "lucide-react";
import Image from "next/image";
import type { Banner } from "@/types";

export default function AdminBannersPage() {
  const supabase = useSupabase();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mobileImageUrl, setMobileImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fetchBanners = async () => {
    const { data } = await supabase
      .from("banners")
      .select("*")
      .order("display_order");
    setBanners(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setImageUrl("");
    setMobileImageUrl("");
    setLinkUrl("");
    setIsActive(true);
    setModalOpen(true);
  };

  const openEdit = (banner: Banner) => {
    setEditing(banner);
    setTitle(banner.title);
    setImageUrl(banner.image_url);
    setMobileImageUrl(banner.mobile_image_url || "");
    setLinkUrl(banner.link_url || "");
    setIsActive(banner.is_active);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!title || !imageUrl) {
      toast.error("제목과 이미지는 필수입니다.");
      return;
    }

    const payload = {
      title,
      image_url: imageUrl,
      mobile_image_url: mobileImageUrl || null,
      link_url: linkUrl || null,
      is_active: isActive,
    };

    if (editing) {
      const { error } = await supabase
        .from("banners")
        .update(payload)
        .eq("id", editing.id);
      if (error) {
        toast.error("수정 실패");
        return;
      }
      toast.success("배너가 수정되었습니다.");
    } else {
      const { error } = await supabase.from("banners").insert({
        ...payload,
        display_order: banners.length,
      });
      if (error) {
        toast.error("등록 실패");
        return;
      }
      toast.success("배너가 등록되었습니다.");
    }

    setModalOpen(false);
    fetchBanners();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (error) {
      toast.error("삭제 실패");
      return;
    }
    toast.success("배너가 삭제되었습니다.");
    fetchBanners();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">배너 관리</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          배너 추가
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : banners.length === 0 ? (
        <p className="text-muted-foreground">등록된 배너가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <GripVertical className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{banner.title}</p>
                <p className="text-xs text-muted-foreground">
                  {banner.is_active ? "활성" : "비활성"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(banner)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(banner.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "배너 수정" : "배너 추가"}
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <Input
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="배너 제목"
          />
          <div>
            <label className="mb-1 block text-sm font-medium">데스크톱 이미지</label>
            <ImageUploader bucket="banners" value={imageUrl} onChange={setImageUrl} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">모바일 이미지 (선택)</label>
            <ImageUploader
              bucket="banners"
              value={mobileImageUrl}
              onChange={setMobileImageUrl}
              aspectRatio="3/4"
            />
          </div>
          <Input
            label="링크 URL (선택)"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">활성화</span>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSave}>
              {editing ? "수정" : "등록"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
