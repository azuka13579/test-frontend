"use client";

import { MultiSelect } from "@/components/form/MultiSelect";
import { useForm } from "@tanstack/react-form";
// import { useState } from "react"; // ❌ Hapus ini, tidak perlu
import z from "zod";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];
const optionhobbies = [
  // --- Tech & Geek ---
  { value: "coding", label: "💻 Coding" },
  { value: "gaming", label: "🎮 Gaming" },
  { value: "design", label: "🎨 UI/UX Design" },
  { value: "ai_enthusiast", label: "🤖 AI Enthusiast" },
  { value: "mechanical_keyboard", label: "⌨️ Mech Keyboard" },

  // --- Olahraga & Outdoor ---
  { value: "football", label: "⚽ Sepak Bola/Futsal" },
  { value: "badminton", label: "🏸 Badminton" },
  { value: "basketball", label: "🏀 Basket" },
  { value: "running", label: "🏃 Lari/Jogging" },
  { value: "cycling", label: "ea Sepeda" },
  { value: "gym", label: "🏋️ Gym/Workout" },
  { value: "hiking", label: "hiking" },
  { value: "swimming", label: "🏊 Renang" },

  // --- Seni & Kreativitas ---
  { value: "photography", label: "📸 Fotografi" },
  { value: "music", label: "🎵 Musik" },
  { value: "drawing", label: "✏️ Menggambar" },
  { value: "writing", label: "✍️ Menulis" },
  { value: "content_creator", label: "📹 Content Creation" },

  // --- Lifestyle ---
  { value: "traveling", label: "✈️ Traveling" },
  { value: "cooking", label: "🍳 Memasak" },
  { value: "reading", label: "📚 Membaca" },
  { value: "movies", label: "🎬 Nonton Film" },
  { value: "coffee", label: "☕ Ngopi/Coffee Shop" },
  { value: "investing", label: "📈 Investasi/Saham" },
  { value: "automotive", label: "🚗 Otomotif" },
];

const formSchema = z.object({
  // Pastikan validasinya array
  frameworks: z.array(z.string()).min(1, "Pilih setidaknya 1 framework"),
  hobbies: z.array(z.string()).min(1, "Pilih setidaknya 1 hobi"),
  name: z.string().min(4, "Minimal 4 Karakter"),
});

export default function App() {
  const form = useForm({
    defaultValues: {
      frameworks: [] as string[], // Default array kosong
      hobbies: [] as string[], // Default array kosong
      name: "" as string,
    },
    validators: {
      onChange: formSchema, // Gunakan onChange biar error langsung muncul/hilang real-time
    },
    onSubmit: async ({ value }) => {
      console.log("Submit:", value);
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div className="mx-auto p-4">
      {/* 1. PERBAIKAN: Semua input & tombol HARUS di dalam tag form */}
      <form
        className="border border-black rounded-2xl flex flex-col gap-4 p-4 max-w-4xl w-4xl"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <h2 className="text-xl font-bold">Pilih Framework</h2>

        <form.Field name="frameworks">
          {(field) => {
            return (
              <div className="flex flex-col gap-1 w-full">
                <MultiSelect
                  options={options}
                  defaultValue={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                  placeholder="Pilih framework..."
                  searchable={false}
                  hideSelectAll={true}
                  variant="inverted"
                  className="border-black border w-full"
                  autoSize={false}
                />

                {/* Tampilkan Error */}
                {field.state.meta.errors.length > 0 && (
                  <em className="text-red-500 text-sm">
                    {(field.state.meta.errors[0] as any)?.message ||
                      field.state.meta.errors[0]}
                  </em>
                )}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="hobbies">
          {(field) => {
            return (
              <div className="flex flex-col gap-1">
                <MultiSelect
                  options={optionhobbies}
                  defaultValue={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                  placeholder="Pilih Hobi..."
                  className="border-black border w-full"
                  autoSize={true}
                  singleLine={true}
                  maxCount={10}
                />

                {/* Tampilkan Error */}
                {field.state.meta.errors.length > 0 && (
                  <em className="text-red-500 text-sm">
                    {(field.state.meta.errors[0] as any)?.message ||
                      field.state.meta.errors[0]}
                  </em>
                )}
              </div>
            );
          }}
        </form.Field>
        <form.Field name="name">
          {(field) => {
            return (
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {/* Tampilkan Error */}
                {field.state.meta.errors.length > 0 && (
                  <em className="text-red-500 text-sm">
                    {(field.state.meta.errors[0] as any)?.message ||
                      field.state.meta.errors[0]}
                  </em>
                )}
              </div>
            );
          }}
        </form.Field>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition duration-300 rounded-2xl"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
