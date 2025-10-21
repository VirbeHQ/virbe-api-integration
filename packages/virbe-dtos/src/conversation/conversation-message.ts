import {z} from 'zod';
import {ParticipantTypeSchema} from './conversation-participant-type';
import {ConversationMessageEngineEventState} from './conversation-message-engine-event-state';
import {FlowEventStatus, FlowEventType} from '../conversation-flow';
import {ProfileBasicResponseDtoSchema} from "../profile";
import {ConversationBasicDtoSchema} from "./conversation";

export const ConversationMessageSignalDtoSchema = z.object({
  name: z.string(),
  // TODO should we keep it as string, what with additional context?
  value: z.string().optional(),
});
export type ConversationMessageSignalDto = z.infer<
  typeof ConversationMessageSignalDtoSchema
>;

export const ConversationMessageTriggerDtoSchema = z.object({
  name: z.string(),
  value: z.string().optional(),
});
export type ConversationMessageTriggerDto = z.infer<
  typeof ConversationMessageTriggerDtoSchema
>;

export const ConversationMessageTextActionDtoSchema = z.object({
  text: z.string(),
  raw: z.string().optional(),
  html: z.string().optional(),
  ssml: z.string().optional(),
  language: z.string().optional(),
});
export type ConversationMessageTextActionDto = z.infer<
  typeof ConversationMessageTextActionDtoSchema
>;

export const ConversationFlowActionDtoSchema = z.object({
  type: z.nativeEnum(FlowEventType),
  exitStatus: z.nativeEnum(FlowEventStatus).optional(),
  exitDetails: z.string().optional(),
  fromFlowId: z.string().optional(),
  fromFlowName: z.string().optional(),
  toFlowId: z.string().optional(),
  toFlowName: z.string().optional(),
  triggeredByNodeId: z.string().optional(),
});

export type ConversationFlowActionDto = z.infer<
  typeof ConversationFlowActionDtoSchema
>;

export const ConversationMessageEngineEventDtoSchema = z.object({
  state: z.nativeEnum(ConversationMessageEngineEventState),
  flowId: z.string().optional(),
  nodeId: z.string().optional(),
  elapsedTime: z.number().optional(),
  llmCallName: z.string().optional(),
  metaData: z.object({}).optional(),
});
export type ConversationMessageEngineEventDto = z.infer<
  typeof ConversationMessageEngineEventDtoSchema
>;

export const ConversationMessageVariableStoreDto = z.object({
  key: z.string(),
  value: z.unknown(),
});
export type ConversationMessageVariableStoreDto = z.infer<
  typeof ConversationMessageVariableStoreDto
>;

export const ConversationMessageToolCallDtoSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  toolId: z.string().optional(),
  args: z.unknown().optional(),
  result: z.unknown().optional(),
  error: z.unknown().optional(),
  type: z.string().optional(),
});

export type ConversationMessageToolCallDto = z.infer<
  typeof ConversationMessageToolCallDtoSchema
>;

export const ConversationMessageCustomActionDtoSchema = z.object({
  name: z.string(),
  value: z.unknown().optional(),
});
export type ConversationMessageCustomActionDto = z.infer<
  typeof ConversationMessageCustomActionDtoSchema
>;

export const ConversationMessageUiActionButtonDtoSchema = z.object({
  id: z.string(),
  label: z.string(),
});

export type ConversationMessageUiActionButtonDto = z.infer<
  typeof ConversationMessageUiActionButtonDtoSchema
>;

export const ConversationMessageUiActionCardDtoSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  imageUrl: z.string().optional(),
  payloadType: z.enum(['text', 'signal']),
  payload: z.union([z.string(), ConversationMessageSignalDtoSchema]).optional(),
});

export type ConversationMessageUiActionCardDto = z.infer<
  typeof ConversationMessageUiActionCardDtoSchema
>;

export const ConversationMessageUiActionDtoSchema = z.object({
  name: z.literal('virbe-payload-v3'),
  value: z.object({
    type: z.enum(['buttons', 'cards', 'input', 'webView']).optional(),
    timeoutMs: z.number().optional().default(10000),
    buttons: z.array(ConversationMessageUiActionButtonDtoSchema).optional(),
    cards: z.array(ConversationMessageUiActionCardDtoSchema).optional(),
    input: z
      .object({
        storeKey: z.string(),
        inputLabel: z.string(),
        inputType: z.string(),
        submitButton: ConversationMessageUiActionButtonDtoSchema,
        cancelButton: ConversationMessageUiActionButtonDtoSchema,
      })
      .optional(),
    webView: z
      .object({
        url: z.string().url().optional(),
        html: z.string().optional(),
        fullscreen: z.boolean().optional().default(false),
        transparent: z.boolean().optional().default(false),
        persistOnConversationStop: z.boolean().optional().default(false),
      })
      .optional(),
  }),
});

export type ConversationMessageUiActionDto = z.infer<
  typeof ConversationMessageUiActionDtoSchema
>;

export const ConversationMessageVirbeAnimationDtoSchema = z.object({
  name: z.string(),
  start: z.number(),
  duration: z.number().optional(),
});

export type ConversationMessageVirbeAnimationDto = z.infer<
  typeof ConversationMessageVirbeAnimationDtoSchema
>;

export const ConversationMessageBehaviourActionDtoSchema = z.object({
  name: z.literal('virbe-payload-v3'),
  value: z.object({
    gestures: z.array(ConversationMessageVirbeAnimationDtoSchema),
    emotions: z.array(ConversationMessageVirbeAnimationDtoSchema),
  }),
});
export type ConversationMessageBehaviourActionDto = z.infer<
  typeof ConversationMessageBehaviourActionDtoSchema
>;

export const ConversationMessageActionDtoSchema = z.object({
  signal: ConversationMessageSignalDtoSchema.optional(),
  text: ConversationMessageTextActionDtoSchema.optional(),
  customAction: ConversationMessageCustomActionDtoSchema.optional(),
  variableStore: ConversationMessageVariableStoreDto.optional(),
  uiAction: ConversationMessageUiActionDtoSchema.optional(),
  behaviorAction: ConversationMessageBehaviourActionDtoSchema.optional(),
  // Why do we keep tool call if we have variable, custom, ui, behavior TODO
  toolCall: ConversationMessageToolCallDtoSchema.optional(),
  engineEvent: ConversationMessageEngineEventDtoSchema.optional(),
  flowEvent: ConversationFlowActionDtoSchema.optional(),
});

export type ConversationMessageActionDto = z.infer<
  typeof ConversationMessageActionDtoSchema
>;

export const ConversationMessageDtoSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  replyTo: z.string().optional(),
  instant: z.coerce.date(),
  participantId: z.string(),
  participantType: ParticipantTypeSchema,
  action: ConversationMessageActionDtoSchema,
});
export type ConversationMessageDto = z.infer<
  typeof ConversationMessageDtoSchema
>;

export const ConversationMessageAsyncCreateDtoSchema = z.object({
  participantId: z.string(),
  participantType: ParticipantTypeSchema.optional(),
  replyTo: z.string().uuid().optional(),
  action: ConversationMessageActionDtoSchema,
});

export type ConversationMessageAsyncCreateDto = z.infer<
  typeof ConversationMessageAsyncCreateDtoSchema
>;

export const ConversationInvokeEngineDtoSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  participantId: z.string().uuid(),
  participantType: ParticipantTypeSchema,
  action: ConversationMessageActionDtoSchema,
  instant: z.coerce.date(),
  profile: ProfileBasicResponseDtoSchema.optional(),
  conversation: ConversationBasicDtoSchema.optional(),
  language: z.string(),
});

export type ConversationInvokeEngineDto = z.infer<
  typeof ConversationInvokeEngineDtoSchema
>;
