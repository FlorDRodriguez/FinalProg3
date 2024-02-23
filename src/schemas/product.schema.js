import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string({
    required_error: "El nombre es obligatorio.",
  }),
  description: z.string({
    required_error: "La descripción es obligatoria.",
  }),
  price: z.string({
    required_error: "El precio es obligatorio.",
  }),
  quantity: z.string({
    required_error: "La cantidad es obligatoria.",
  }),
});