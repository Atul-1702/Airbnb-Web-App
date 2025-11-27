import { z } from "zod";

const hotelZodSchema = z.object({
  name: z.string(),
  address: z.string(),
  pincode: z.int().nonnegative(),
  rating: z.number().nonnegative(),
  rating_count: z.int().nonnegative(),
});

export type hoteldto = z.infer<typeof hotelZodSchema>;

export default hotelZodSchema;
