"use server";

import { addSheetRow, GuestBookEntry } from "@/lib/googlesheet";
import { revalidatePath } from "next/cache";

export async function submitGuestbook(formData: FormData) {
  const nama = formData.get("nama") as string;
  const komentar = formData.get("komentar") as string;

  if (!nama || !komentar) return;

  const newRow: GuestBookEntry = {
    Nama: nama,
    Komentar: komentar,
    Tanggal: new Date().toLocaleString("id-ID"),
  };

  await addSheetRow(newRow);
  revalidatePath("/");
}
