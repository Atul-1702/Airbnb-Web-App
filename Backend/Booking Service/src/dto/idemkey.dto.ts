import { z } from "zod";

const idemKeyZodSchema = z.object({
  idemKey: z.uuidv4(),
});

export type idemkeydto = z.infer<typeof idemKeyZodSchema>;
export default idemKeyZodSchema;
