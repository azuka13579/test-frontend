"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField, NumberField, SubmitButton } from "@/components"; // Import komponen UI tadi

// 1. Buat Context
export const { fieldContext, formContext } = createFormHookContexts();

// 2. Buat Hook Global untuk Aplikasi
export const { useAppForm } = createFormHook({
  // Masukkan komponen field yang ingin diikat
  fieldComponents: {
    TextField,
    NumberField,
  },
  // Masukkan komponen form level (tombol submit, debug tool, dll)
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
