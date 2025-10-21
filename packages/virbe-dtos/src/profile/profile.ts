import {z} from "zod";
import {TouchpointScheme} from "./touchpoint";

export const ProfileBasicResponseDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  secret: z.string(),
  personaId: z.string().optional(),
  context: z.string().optional(),
  touchpoint: TouchpointScheme,
  predefined: z.boolean(),
  sttEngineId: z.string().optional(),
  languages: z.array(z.string()),
  suspended: z.boolean(),
  createdAt: z.coerce.date(),
  modifiedAt: z.coerce.date(),
  archivedAt: z.coerce.date().optional(),
});

export type ProfileBasicResponseDto = z.infer<
  typeof ProfileBasicResponseDtoSchema
>;
