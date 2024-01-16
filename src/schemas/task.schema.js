import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "El título es obligatorio.",
  }),
  description: z.string({
    required_error: "La descripción es obligatoria.",
  }),
  date: z.string().datetime().optional(),
});