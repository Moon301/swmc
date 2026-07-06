"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import { formatDate, extractYouTubeId } from "@/lib/utils";
import { SERMON_TYPES } from "@/lib/constants";
import type { Sermon } from "@/types";

export default function AdminSermonsPage() {
  const supabase = useSupabase();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("나현숙 목사");
  const [scripture, setScripture] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [sermonDate, setSermonDate] = useState("");
  const [sermonType, setSermonType] = useState("sunday_morning");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const fetchSermons = async () => {
    const { data } = await supabase
      .from("sermons")
      .select("*")
      .order("sermon_date", { ascending: false });
    setSermons(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setPreacher("나현숙 목사");
    setScripture("");
    setYoutubeUrl("");
    setSermonDate(new Date().toISOString().split("T")[0]);
    setSermonType("sunday_morning");
    setDescription("");
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEdit = (sermon: Sermon) => {
    setEditing(sermon);
    setTitle(sermon.title);
    setPreacher(sermon.preacher);
    setScripture(sermon.scripture || "");
    setYoutubeUrl(`https://www.youtube.com/watch?v=${sermon.youtube_video_id}`);
    setSermonDate(sermon.sermon_date);
    setSermonType(sermon.sermon_type);
    setDescription(sermon.description || "");
    setIsPublished(sermon.is_published);
    setModalOpen(true);
  };

  const handleSave = async () => {
    const videoId = extractYouTubeId(youtubeUrl) || youtubeUrl;
    if (!title || !videoId) {
      toast.error("제목과 YouTube URL은 필수입니다.");
      return;
    }

    setSaving(true);
    const payload = {
      title,
      preacher,
      scripture: scripture || null,
      youtube_video_id: videoId,
      sermon_date: sermonDate,
      sermon_type: sermonType,
      description: description || null,
      is_published: isPublished,
    };

    if (editing) {
      const { error } = await supabase
        .from("sermons")
        .update(payload)
        .eq("id", editing.id);
      if (error) { toast.error("수정 실패"); setSaving(false); return; }
      toast.success("설교가 수정되었습니다.");
    } else {
      const { error } = await supabase.from("sermons").insert(payload);
      if (error) { toast.error("등록 실패"); setSaving(false); return; }
      toast.success("설교가 등록되었습니다.");
    }

    setSaving(false);
    setModalOpen(false);
    fetchSermons();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("sermons").delete().eq("id", id);
    if (error) { toast.error("삭제 실패"); return; }
    toast.success("설교가 삭제되었습니다.");
    fetchSermons();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">설교 관리</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          설교 등록
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : sermons.length === 0 ? (
        <p className="text-muted-foreground">등록된 설교가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{sermon.title}</p>
                <p className="text-xs text-muted-foreground">
                  {sermon.preacher} · {formatDate(sermon.sermon_date)} ·{" "}
                  {sermon.is_published ? "공개" : "비공개"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(sermon)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(sermon.id)}>
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
        title={editing ? "설교 수정" : "설교 등록"}
        className="max-w-lg"
      >
        <div className="space-y-4">
          <Input label="제목" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="설교 제목" />
          <Input label="설교자" value={preacher} onChange={(e) => setPreacher(e.target.value)} placeholder="나현숙 목사" />
          <Input label="성경본문" value={scripture} onChange={(e) => setScripture(e.target.value)} placeholder="요한복음 3:16" />
          <Input label="YouTube URL 또는 Video ID" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
          <Input label="설교 날짜" type="date" value={sermonDate} onChange={(e) => setSermonDate(e.target.value)} />
          <Select
            label="설교 유형"
            value={sermonType}
            onChange={(e) => setSermonType(e.target.value)}
            options={SERMON_TYPES.map((t) => ({ value: t.value, label: t.label }))}
          />
          <Textarea label="설명 (선택)" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설교 설명..." />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded" />
            <span className="text-sm">공개</span>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
            <Button onClick={handleSave} loading={saving}>{editing ? "수정" : "등록"}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
