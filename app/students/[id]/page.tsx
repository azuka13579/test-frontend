"use client";
import { useEffect, useState } from "react";
import { deleteStudent, fetchStudent } from "@/api/student";
import { Student } from "@/types/student";
import StudentCard from "@/components/student/studentcard";
import DeleteButton from "@/components/common/deletebutton";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SkeletonCard from "@/components/common/skeletoncard";

export default function studentDetail({ params }: { params: { id: string } }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const getStudent = async () => {
      try {
        const id = (await params).id;
        const res = await fetchStudent(id);
        setStudent(res.data);

        setLoading(false);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    getStudent();
  }, []);

  const handleDelete = async () => {
    if (!student) return;
    const confirmDelete = confirm(
      `Are you sure you want to delete student ${student.name}?`
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      const idDel = (await params).id;
      const res = await deleteStudent(idDel);
      console.log(res);
      toast.success(res.message);
      router.push("/students");
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const updateLink = async () => {
    const idUpd = (await params).id;
    router.push(`/students/update/${idUpd}`);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>Student Detail Page</h1>
      {loading ? (
        <>
          <SkeletonCard></SkeletonCard>
        </>
      ) : student ? (
        <StudentCard student={student}></StudentCard>
      ) : (
        <div>No student data found</div>
      )}
      <div className=" flex gap-4">
        <DeleteButton
          work={handleDelete}
          color="red"
          kata="Delete"
        ></DeleteButton>
        <DeleteButton
          work={updateLink}
          color="blue"
          kata="Update"
        ></DeleteButton>
      </div>
    </div>
  );
}
