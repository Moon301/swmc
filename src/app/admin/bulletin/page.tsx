"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/components/providers/SupabaseProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { uploadFile } from "@/lib/supabase/storage";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Bulletin } from "@/types";

export default function AdminBulletinPage() {
  const supabase = useSupabase();
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Bulletin | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [bulletinDate, setBulletinDate] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfUploading, setPdfUploading] = useState(false);

  const fetchBulletins = async () => {
    const { data } = await supabase
      .from("bulletins")
      .select("*")
      .order("bulletin_date", { ascending: false });
    setBulletins(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBulletins();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setBulletinDate(new Date().toISOString().split("T")[0]);
    setPdfUrl("");
    setModalOpen(true);
  };

  const openEdit = (bulletin: Bulletin) => {
    setEditing(bulletin);
    setTitle(bulletin.title);
    setBulletinDate(bulletin.bulletin_date);
    setPdfUrl(bulletin.pdf_url || "");
    setModalOpen(true);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfUploading(true);
    try {
      const url = await uploadFile("bulletins", file);
      setPdfUrl(url);
    } catch {
      toast.error("PDF 업로드 실패");
    } finally {
      setPdfUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !bulletinDate) {
      toast.error("제목과 날짜는 필수입니다.");
      return;
    }

    setSaving(true);
    const payload = {
      title,
      bulletin_date: bulletinDate,
      pdf_url: pdfUrl || null,
    };

    if (editing) {
      const { error } = await supabase
        .from("bulletins")
        .update(payload)
        .eq("id", editing.id);
      if (error) { toast.error("수정 실패"); setSaving(false); return; }
      toast.success("주보가 수정되었습니다.");
    } else {
      const { error } = await supabase.from("bulletins").insert(payload);
      if (error) { toast.error("등록 실패"); setSaving(false); return; }
      toast.success("주보가 등록되었습니다.");
    }

    setSaving(false);
    setModalOpen(false);
    fetchBulletins();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from("bulletins").delete().eq("id", id);
    if (error) { toast.error("삭제 실패"); return; }
    toast.success("주보가 삭제되었습니다.");
    fetchBulletins();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">주보 관리</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          주보 등록
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">로딩 중...</p>
      ) : bulletins.length === 0 ? (
        <p className="text-muted-foreground">등록된 주보가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {bulletins.map((bulletin) => (
            <div
              key={bulletin.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{bulletin.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(bulletin.bulletin_date)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(bulletin)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(bulletin.id)}>
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
        title={editing ? "주보 수정" : "주보 등록"}
      >
        <div className="space-y-4">
          <Input label="제목" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="주보 제목" />
          <Input label="날짜" type="date" value={bulletinDate} onChange={(e) => setBulletinDate(e.target.value)} />
          <div>
            <label className="mb-1 block text-sm font-medium">PDF 파일</label>
            <input type="file" accept=".pdf" onChange={handlePdfUpload} className="text-sm" />
            {pdfUploading && <p className="text-xs text-muted-foreground mt-1">업로드 중...</p>}
            {pdfUrl && <p className="text-xs text-green-600 mt-1">PDF 업로드 완료</p>}
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
