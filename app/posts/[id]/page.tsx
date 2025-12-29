import createComment from "./action";
import DetailPost from "@/components/post/detailpost";

export default async function postPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const res = await params;
  const id = res.id;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <DetailPost slug={id}></DetailPost>
      </div>
    </>
  );
}
