"use client";

// Tipe untuk props komponen field
// FieldApi menangani state, handleChange, error, dll.
interface FieldProps {
  field: any;
  label: string;
}

export function TextField({ field, label }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="border p-2 rounded w-full text-black"
        placeholder={label}
      />
      {/* Tampilkan Error jika ada */}
      {field.state.meta.errors ? (
        <p className="text-red-500 text-sm mt-1">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export function NumberField({ field, label }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(Number(e.target.valueAsNumber))}
        className="border p-2 rounded w-full text-black"
      />
      {field.state.meta.errors ? (
        <p className="text-red-500 text-sm mt-1">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </div>
  );
}

export function SubmitButton() {
  // Kita bisa akses status form lewat hook useFormStatus jika perlu,
  // tapi di sini kita pakai tombol biasa dulu.
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Submit Data
    </button>
  );
}
