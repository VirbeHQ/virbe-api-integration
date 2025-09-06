import { z } from 'zod';

export const ConversationState = {
  Active: 'Active',
  Closed: 'Closed',
} as const;

export type ConversationState =
  (typeof ConversationState)[keyof typeof ConversationState];

export const ConversationStateSchema = z.nativeEnum(ConversationState);
