"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import SkeletonCard from "../../components/common/skeletoncard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import PaginationUmum from "../../components/common/paginationumum";
import { fetchPostsUser } from "@/api/post";
import { Post } from "@/types/post";
import PostCard from "@/components/post/postcard";
import { useAuth } from "@/hooks/useAuth";
import Profile from "@/components/common/profile";

type MetaData = {
  current_page: number;
  last_page: number;
  total: number;
};

export default function postsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(10);

  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<MetaData | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!search) {
      setPosts([]);
    }
    setLoading(true);

    const delaySearch = setTimeout(async () => {
      try {
        const res = await fetchPostsUser(search, page, show, user?.id);
        setPosts(res.data);
        setMeta(res.meta);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search]);

  useEffect(() => {
    const pertama = async () => {
      try {
        const res = await fetchPostsUser(search, page, show, user?.id);
        setPosts(res.data);
        setMeta(res.meta);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    pertama();
  }, [user, page, show]);

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
      <Profile></Profile>
      {user?.role == "creator" && (
        <div className=" bg-white rounded-xl shadow-2md p-2 mt-4">
          <div className="flex flex-col gap-2 justify-start md:flex-row md:justify-between p-4 px-10 items-center">
            <h1 className="my-auto text-2xl font-bold">Posts List</h1>
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
              {user?.role == "creator" && (
                <Link
                  href={"posts/buat"}
                  className="border-2 rounded-2xl px-4 py-2"
                >
                  Buat post
                </Link>
              )}
            </div>
          </div>
          <div className="px-1 md:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <>
                <SkeletonCard h="50" hh="20"></SkeletonCard>
                <SkeletonCard h="50" hh="20"></SkeletonCard>
                <SkeletonCard h="50" hh="20"></SkeletonCard>
                <SkeletonCard h="50" hh="20"></SkeletonCard>
                <SkeletonCard h="50" hh="20"></SkeletonCard>
                <SkeletonCard h="50" hh="20"></SkeletonCard>
              </>
            ) : posts.length == 0 ? (
              <div className="flex justify-center w-full col-span-full">
                <p>Data tidak ada</p>
              </div>
            ) : (
              posts.map((post: Post) => (
                <PostCard data={post} key={post.id}></PostCard>
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
      )}
    </div>
  );
}
