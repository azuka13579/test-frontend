"use client";
import { useEffect, useState } from "react";
import { Student } from "../../types/student";
import { fetchAllStudents, fetchStudents } from "../../api/student";
import Link from "next/link";
import SkeletonCard from "../../components/common/skeletoncard";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import PaginationUmum from "../../components/common/paginationumum";

type MetaData = {
  current_page: number;
  last_page: number;
  total: number;
};

export default function page() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(10);

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<MetaData | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!search) {
      setStudents([]);
    }
    setLoading(true);

    const delaySearch = setTimeout(async () => {
      try {
        const res = await fetchStudents(search, page, show);
        setStudents(res.data);
        setMeta(res.meta);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search, page, show]);

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      toast.error("Anda belum login", { id: "auth_error" });
      router.push("/");
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && meta && newPage <= meta.last_page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 justify-start md:flex-row md:justify-between p-4 px-10 items-center">
        <h1 className="my-auto">Students List</h1>
        <div className="flex flex-col md:flex-row gap-2">
          <select
            name="pagination"
            className="border-2 rounded-xl px-2 py-2" // Tambahkan styling dikit agar senada
            value={show}
            onChange={(e) => {
              setShow(Number(e.target.value));
              setPage(1); // Reset ke halaman 1
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </select>
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search..."
            className="border-2 rounded-2xl px-4 py-2 mr-4"
            onChange={handleSearch}
          />
          <Link
            href={"students/tambah"}
            className="border-2 rounded-2xl px-4 py-2"
          >
            Tambah data
          </Link>
        </div>
      </div>
      <div className="px-1 md:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
            <SkeletonCard></SkeletonCard>
          </>
        ) : students.length == 0 ? (
          <div className="flex justify-center w-full col-span-full">
            <p>Data tidak ada</p>
          </div>
        ) : (
          students.map((student: Student) => (
            <div
              className="border p-2 rounded-lg border-gray-500"
              key={student.id}
            >
              <Link className="" href={`/students/${student.id}`}>
                <p>{student.name}</p>
                <p>{student.student_id}</p>
                <p className="truncate">{student.email}</p>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Bagian Pagination ShadCN */}
      {meta && meta.last_page > 1 && (
        <PaginationUmum
          meta={meta}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
