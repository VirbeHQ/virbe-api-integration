export const FlowEventType = {
  Started: 'Started',
  Ended: 'Ended',
};

export type FlowEventType = (typeof FlowEventType)[keyof typeof FlowEventType];
