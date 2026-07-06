import Image from "next/image";
import Link from "next/link";
import type { GalleryAlbum } from "@/types";

interface GalleryPreviewProps {
  albums: GalleryAlbum[];
}

export function GalleryPreview({ albums }: GalleryPreviewProps) {
  if (albums.length === 0) return null;

  return (
    <section className="border-t border-gray-100 bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[13px] font-medium text-primary">Gallery</p>
            <h2 className="mt-2 text-[28px] font-bold text-gray-900">포토갤러리</h2>
          </div>
          <Link
            href="/gallery"
            className="hidden text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900 sm:block"
          >
            전체보기 &rarr;
          </Link>
        </div>

        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {albums.map((album) => (
            <Link
              key={album.id}
              href="/gallery"
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="relative aspect-square">
                {album.cover_image_url ? (
                  <Image
                    src={album.cover_image_url}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100">
                    <span className="text-[13px] text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="px-3.5 py-3">
                <p className="truncate text-[14px] font-medium text-gray-800">
                  {album.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
