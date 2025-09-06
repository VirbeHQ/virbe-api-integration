import { z } from 'zod';

export const ParticipantType = {
  Api: 'Api',
  EndUser: 'EndUser',
  User: 'User',
} as const;

export type ParticipantType =
  (typeof ParticipantType)[keyof typeof ParticipantType];

export const ParticipantTypeSchema = z.nativeEnum(ParticipantType);
