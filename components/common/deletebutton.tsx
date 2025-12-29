import React from "react";

export default function deletebutton({
  work,
  color,
  kata,
}: {
  work: () => void;
  color: string;
  kata: string;
}) {
  const colorVariants: any = {
    red: "bg-red-500 hover:bg-red-700",
    blue: "bg-blue-500 hover:bg-blue-700",
    green: "bg-green-500 hover:bg-green-700",
    yellow: "bg-yellow-500 hover:bg-yellow-700",
  };
  return (
    <button
      onClick={work}
      className={`${colorVariants[color]} text-white px-4 py-2 rounded-2xl transisiton`}
    >
      {kata}
    </button>
  );
}
