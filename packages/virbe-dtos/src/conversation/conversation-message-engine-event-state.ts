export const ConversationMessageEngineEventState = {
  ProcessingStarted: 'ProcessingStarted',
  NodeProcessing: 'NodeProcessing',
  LlmCallStarted: 'LlmCallStarted',
  LlmCallError: 'LlmCallError',
  LlmCallEnded: 'LlmCallEnded',
  ProcessingCompleted: 'ProcessingCompleted',
} as const;

export type ConversationMessageEngineEventState =
  (typeof ConversationMessageEngineEventState)[keyof typeof ConversationMessageEngineEventState];
