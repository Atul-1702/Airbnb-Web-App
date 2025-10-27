import { z } from "zod";

const bookingZodSchema = z.object({
  userId: z.number().int(),
  hotelId: z.number().int(),
  totalGuests: z.number().int(),
  bookingAmount: z.number().positive(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]).default("PENDING"),
});

export type bookingdto = z.infer<typeof bookingZodSchema>;
export default bookingZodSchema;
