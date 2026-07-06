"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Pin } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { NEWS_CATEGORIES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import slugify from "slugify";
import type { News } from "@/types";

export default function AdminNewsPage() {
  const supabase = useSupabase();
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("news");
  const [isPinned, setIsPinned] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const fetchNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    setNewsList(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setContent("");
    setCategory("news");
    setIsPinned(false);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEdit = (news: News) => {
    setEditing(news);
    setTitle(news.title);
    setContent(news.content);
    setCategory(news.category);
    setIsPinned(news.is_pinned);
    setIsPublished(news.is_published);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!title) {
      toast.error("제목은 필수입니다.");
      return;
    }

    setSaving(true);
    const slug = slugify(title, { lower: true, strict: true }) + "-" + Date.now();

    const payload = {
      title,
      content,
      category,
      is_pinned: isPinned,
      is_published: isPublished,
      ...(editing ? {} : { slug }),
    };

    if (editing) {
      const { error } = await supabase
        .from("news")
        .update(payload)
        .eq("id", editing.id);
      if (error) { toast.error("수정 실패"); setSaving(false); return; }
      toast.success("소식이 수정되었습니다.");
    } else {
      const { error } = await supabase.from("news").insert(payload);
      if (error) { toast.error("등록 실패"); setSaving(false); return; }
      toast.success("소식이 등록되었습니다.");
    }

    setSaving(false);
    setModalOpen(false);
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) { toast.error("삭제 실패"); return; }
    toast.success("소식이 삭제되었습니다.");
    fetchNews();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">소식 관리</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          소식 작성
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : newsList.length === 0 ? (
        <p className="text-muted-foreground">등록된 소식이 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {newsList.map((news) => {
            const cat = NEWS_CATEGORIES.find((c) => c.value === news.category);
            return (
              <div
                key={news.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
              >
                {news.is_pinned && <Pin className="h-4 w-4 shrink-0 text-primary" />}
                <Badge variant={news.category === "notice" ? "danger" : "default"}>
                  {cat?.label || news.category}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{news.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(news.created_at)} · {news.is_published ? "공개" : "비공개"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(news)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(news.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "소식 수정" : "소식 작성"}
        className="max-w-3xl"
      >
        <div className="space-y-4">
          <Input label="제목" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="소식 제목" />
          <Select
            label="카테고리"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={NEWS_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
          />
          <div>
            <label className="mb-1 block text-sm font-medium">내용</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="rounded" />
              <span className="text-sm">고정글</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded" />
              <span className="text-sm">공개</span>
            </label>
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
