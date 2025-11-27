import { z } from "zod";

const roomCategoriesZodSchema = z.object({
  room_type: z.enum(["DELUXE", "SUITE", "EXECUTIVE", "SINGLE", "DOUBLE"]),
  price: z.number().nonnegative(),
  room_count: z.int().nonnegative(),
  hotel_id: z.int().positive(),
});

export type roomscategoriesdto = z.infer<typeof roomCategoriesZodSchema>;
export default roomCategoriesZodSchema;
