"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/supabase/storage";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  bucket: "banners" | "popups" | "sermons" | "news" | "gallery" | "bulletins" | "pages";
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: string;
}

export function ImageUploader({
  bucket,
  value,
  onChange,
  className,
  aspectRatio = "16/9",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setUploading(true);
      try {
        const url = await uploadFile(bucket, file);
        onChange(url);
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setUploading(false);
      }
    },
    [bucket, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    maxFiles: 1,
  });

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-border" style={{ aspectRatio }}>
          <Image src={value} alt="업로드 이미지" fill className="object-cover" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/50",
            isDragActive && "border-primary bg-primary/5"
          )}
          style={{ aspectRatio }}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                이미지를 드래그하거나 클릭하여 업로드
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
