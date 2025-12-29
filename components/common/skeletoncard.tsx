import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  h?: string;
  hh?: string;
}

export default function skeletoncard({ h, hh }: SkeletonCardProps) {
  return (
    <Skeleton
      className={`bg-gray-200 w-full h-${h} p-2 flex flex-col gap-1 border border-gray-500`}
    >
      <Skeleton className={`bg-gray-300 w-full h-${hh}`}></Skeleton>
      <Skeleton className={`bg-gray-300 w-full h-${hh}`}></Skeleton>
      <Skeleton className={`bg-gray-300 w-full h-${hh}`}></Skeleton>
    </Skeleton>
  );
}
