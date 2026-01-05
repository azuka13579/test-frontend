"use server";

import { CommentsSchema } from "@/config/ZodSchema";
import { addSheetRow, GuestBookEntry } from "@/lib/googlesheet";
import { revalidatePath } from "next/cache";

export async function submitGuestbook(formData: FormData) {
  const data = {
    username: formData.get("nama") as string,
    comment: formData.get("komentar") as string,
  };

  const result = CommentsSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return { errors: result.error.flatten().fieldErrors };
  }

  const newRow: GuestBookEntry = {
    Nama: result.data?.username as string,
    Komentar: result.data?.comment as string,
    Tanggal: new Date().toLocaleString("id-ID"),
  };

  await addSheetRow(newRow);
  revalidatePath("/");
}
