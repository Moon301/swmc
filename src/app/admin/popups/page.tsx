"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Popup } from "@/types";

export default function AdminPopupsPage() {
  const supabase = useSupabase();
  const [popups, setPopups] = useState<Popup[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Popup | null>(null);

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [showTodayClose, setShowTodayClose] = useState(true);

  const fetchPopups = async () => {
    const { data } = await supabase
      .from("popups")
      .select("*")
      .order("created_at", { ascending: false });
    setPopups(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setImageUrl("");
    setLinkUrl("");
    setIsActive(true);
    setShowTodayClose(true);
    setModalOpen(true);
  };

  const openEdit = (popup: Popup) => {
    setEditing(popup);
    setTitle(popup.title);
    setImageUrl(popup.image_url || "");
    setLinkUrl(popup.link_url || "");
    setIsActive(popup.is_active);
    setShowTodayClose(popup.show_today_close);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!title) {
      toast.error("제목은 필수입니다.");
      return;
    }

    const payload = {
      title,
      image_url: imageUrl || null,
      link_url: linkUrl || null,
      is_active: isActive,
      show_today_close: showTodayClose,
    };

    if (editing) {
      const { error } = await supabase
        .from("popups")
        .update(payload)
        .eq("id", editing.id);
      if (error) {
        toast.error("수정 실패");
        return;
      }
      toast.success("팝업이 수정되었습니다.");
    } else {
      const { error } = await supabase.from("popups").insert(payload);
      if (error) {
        toast.error("등록 실패");
        return;
      }
      toast.success("팝업이 등록되었습니다.");
    }

    setModalOpen(false);
    fetchPopups();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("popups").delete().eq("id", id);
    if (error) {
      toast.error("삭제 실패");
      return;
    }
    toast.success("팝업이 삭제되었습니다.");
    fetchPopups();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">팝업 관리</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          팝업 추가
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : popups.length === 0 ? (
        <p className="text-muted-foreground">등록된 팝업이 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {popups.map((popup) => (
            <div
              key={popup.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{popup.title}</p>
                <p className="text-xs text-muted-foreground">
                  {popup.is_active ? "활성" : "비활성"} ·{" "}
                  {popup.show_today_close ? "오늘 하루 닫기 O" : "오늘 하루 닫기 X"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(popup)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(popup.id)}>
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
        title={editing ? "팝업 수정" : "팝업 추가"}
        className="max-w-lg"
      >
        <div className="space-y-4">
          <Input
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="팝업 제목"
          />
          <div>
            <label className="mb-1 block text-sm font-medium">이미지 (선택)</label>
            <ImageUploader
              bucket="popups"
              value={imageUrl}
              onChange={setImageUrl}
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
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTodayClose}
              onChange={(e) => setShowTodayClose(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">오늘 하루 보지 않기 버튼</span>
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
