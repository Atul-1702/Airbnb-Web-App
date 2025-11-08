import { z } from "zod";

const notificationzodSchema = z.object({
  to: z.email(),
  subject: z.string(),
  templateId: z.string(),
  params: z.any(),
});

type NotificationDto = z.infer<typeof notificationzodSchema>;
export default NotificationDto;
