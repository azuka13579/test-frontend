import { z } from "zod";

const numberSchema = z.number().min(1).max(100); // A number between 1 and 100

const nameSchema = z
  .string()
  .min(6, { message: "Username must be at least 6 characters long" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username must not contain special characters",
  });

const commentSchema = z
  .string()
  .min(1, { message: "Comment must be at least 1 characters long" })
  .max(100, { message: "Comment cannot exceed 100 characters" });

export const CommentsSchema = z.object({
  username: nameSchema,
  comment: commentSchema,
});
