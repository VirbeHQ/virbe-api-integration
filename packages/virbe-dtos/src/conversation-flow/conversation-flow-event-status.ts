export const FlowEventStatus = {
  Success: 'Success',
  Failed: 'Failed',
  NotStarted: 'NotStarted',
};

export type FlowEventStatus =
  (typeof FlowEventStatus)[keyof typeof FlowEventStatus];
