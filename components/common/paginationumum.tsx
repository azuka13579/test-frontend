// components/CustomPagination.tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sesuaikan tipe data Meta ini dengan respon API kamu
type MetaData = {
  current_page: number;
  last_page: number;
  // field lain tidak wajib untuk UI ini
};

interface CustomPaginationProps {
  meta: MetaData | null;
  page: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationUmum({
  meta,
  page,
  onPageChange,
}: CustomPaginationProps) {
  // Jika meta belum ada atau halaman cuma 1, jangan tampilkan apa-apa
  if (!meta || meta.last_page <= 1) return null;

  // Helper untuk menangani klik agar lebih rapi
  const handlePageClick = (e: React.MouseEvent, pageNumber: number) => {
    e.preventDefault();
    onPageChange(pageNumber);
  };

  return (
    <div className="py-8">
      <Pagination>
        <PaginationContent>
          {/* Tombol Previous */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => handlePageClick(e, page - 1)}
              className={
                page <= 1
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* Menampilkan Page 1 jika posisi jauh */}
          {page > 2 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, 1)}
                className="cursor-pointer"
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis Awal */}
          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Halaman Sebelumnya (n-1) */}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, page - 1)}
                className="cursor-pointer"
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Halaman Aktif */}
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="cursor-pointer"
              onClick={(e) => e.preventDefault()}
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {/* Halaman Berikutnya (n+1) */}
          {page < meta.last_page && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, page + 1)}
                className="cursor-pointer"
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis Akhir */}
          {page < meta.last_page - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Halaman Terakhir */}
          {page < meta.last_page - 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, meta.last_page)}
                className="cursor-pointer"
              >
                {meta.last_page}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Tombol Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => handlePageClick(e, page + 1)}
              className={
                page >= meta.last_page
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
