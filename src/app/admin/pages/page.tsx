"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import type { PageContent } from "@/types";

export default function AdminPagesPage() {
  const supabase = useSupabase();
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PageContent | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPages = async () => {
    const { data } = await supabase
      .from("page_contents")
      .select("*")
      .order("page_key");
    setPages(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openEdit = (page: PageContent) => {
    setEditing(page);
    setTitle(page.title);
    setContent(page.content);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    const { error } = await supabase
      .from("page_contents")
      .update({ title, content })
      .eq("id", editing.id);

    if (error) {
      toast.error("저장 실패");
      setSaving(false);
      return;
    }

    toast.success("페이지가 저장되었습니다.");
    setSaving(false);
    setModalOpen(false);
    fetchPages();
  };

  const pageKeyLabels: Record<string, string> = {
    about_greeting: "인사말",
    about_history: "교회역사",
    about_vision: "비전",
    about_pastor: "담임목사 소개",
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">페이지 편집</h1>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : (
        <div className="space-y-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div>
                <p className="font-medium">{page.title}</p>
                <p className="text-xs text-muted-foreground">
                  {pageKeyLabels[page.page_key] || page.page_key}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => openEdit(page)}>
                <Pencil className="h-4 w-4" />
                편집
              </Button>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`페이지 편집 - ${editing?.title || ""}`}
        className="max-w-3xl"
      >
        <div className="space-y-4">
          <Input
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <label className="mb-1 block text-sm font-medium">내용</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSave} loading={saving}>
              저장
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
