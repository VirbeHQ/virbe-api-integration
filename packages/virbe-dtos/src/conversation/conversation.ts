import {z} from 'zod';

export const ConversationBasicDtoSchema = z.object({
  id: z.string().uuid(),
  endUserId: z.string().uuid(),
  profileId: z.string().uuid(),
  origin: z.string(),
  userAgent: z.string(),
  state: z.string(),
  humanHandover: z.boolean(),
  createdAt: z.coerce.date(),
  modifiedAt: z.coerce.date(),
});

export type ConversationBasicDto = z.infer<typeof ConversationBasicDtoSchema>;
