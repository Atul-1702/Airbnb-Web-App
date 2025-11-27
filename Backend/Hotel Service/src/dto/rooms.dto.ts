import { z } from "zod";

const roomsZodSchema = z.object({
  hotel_id: z.int().positive(),
  room_category: z.int().nonnegative(),
  date_of_availability: z.date(),
  booking_id: z.int().positive(),
});

export type roomsdto = z.infer<typeof roomsZodSchema>;
export default roomsZodSchema;
