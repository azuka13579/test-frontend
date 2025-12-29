import React from "react";
import { Student } from "@/types/student";

export default function studentcard({ student }: { student: Student }) {
  return (
    <div className="p-2 border-2 rounded-xl mt-2 w-full">
      <div className="">Student ID: {student.id}</div>
      <div className="">Studen Name: {student.name}</div>
      <div className="">Student Email: {student.email}</div>
    </div>
  );
}
