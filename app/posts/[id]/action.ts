"use server";

export default async function createComment(formData: FormData) {
  console.log("Komentar diterima:", formData.get("komentar"));
}
