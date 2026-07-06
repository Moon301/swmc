"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryAlbum, GalleryPhoto } from "@/types";

export function GalleryGrid({ albums }: { albums: GalleryAlbum[] }) {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos = selectedAlbum?.photos?.sort(
    (a: GalleryPhoto, b: GalleryPhoto) => a.display_order - b.display_order
  ) ?? [];

  const openLightbox = (album: GalleryAlbum, index: number = 0) => {
    setSelectedAlbum(album);
    setPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedAlbum(null);
    setPhotoIndex(0);
  };

  if (albums.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        등록된 앨범이 없습니다.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => openLightbox(album)}
            className="group overflow-hidden rounded-2xl bg-white text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="relative aspect-[4/3]">
              {album.cover_image_url ? (
                <Image
                  src={album.cover_image_url}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
              {album.photos && album.photos.length > 0 && (
                <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
                  {album.photos.length}장
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{album.title}</h3>
              {album.description && (
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {album.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedAlbum && photos.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="닫기"
          >
            <X className="h-6 w-6" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={() =>
                  setPhotoIndex((prev) =>
                    prev === 0 ? photos.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="이전"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() =>
                  setPhotoIndex((prev) =>
                    prev === photos.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label="다음"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative max-h-[80vh] max-w-4xl">
            <Image
              src={photos[photoIndex].image_url}
              alt={photos[photoIndex].caption || selectedAlbum.title}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            {photos[photoIndex].caption && (
              <p className="mt-2 text-center text-sm text-white/80">
                {photos[photoIndex].caption}
              </p>
            )}
            <p className="mt-1 text-center text-xs text-white/50">
              {photoIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
