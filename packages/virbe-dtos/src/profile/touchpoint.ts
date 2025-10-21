import { z } from 'zod';

export const Touchpoint = {
  WebSDK: 'WebSDK',
  UnitySDK: 'UnitySDK',
  UnrealSDK: 'UnrealSDK',
  WebWidget: 'WebWidget',
  DashboardWebPreview: 'DashboardWebPreview',
  VirbeKiosk: 'VirbeKiosk',
  VirbeSpace: 'VirbeSpace',
} as const;

export type Touchpoint = (typeof Touchpoint)[keyof typeof Touchpoint];

export const TouchpointScheme = z.nativeEnum(Touchpoint);
