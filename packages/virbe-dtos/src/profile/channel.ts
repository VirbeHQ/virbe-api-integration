import { Touchpoint } from './touchpoint';

export const ChannelType = {
  Web: 'Web',
  Unity: 'Unity',
  Unreal: 'Unreal',
} as const;

export type ChannelType =
  (typeof ChannelType)[keyof typeof ChannelType];

export const TouchpointChannels = {
  forTouchPoint(touchpoint: Touchpoint): ChannelType {
    switch (touchpoint) {
      // Web SDK and Virbe supported apps built with it
      case Touchpoint.WebSDK:
        return ChannelType.Web;
      case Touchpoint.WebWidget:
        return ChannelType.Web;
      case Touchpoint.DashboardWebPreview:
        return ChannelType.Web;

      // Unity SDK and Virbe supported apps built with it
      case Touchpoint.UnitySDK:
        return ChannelType.Unity;
      case Touchpoint.VirbeSpace:
        return ChannelType.Unity;

      // Unreal SDK and Virbe supported apps built with it
      case Touchpoint.UnrealSDK:
        return ChannelType.Unreal;
      case Touchpoint.VirbeKiosk:
        return ChannelType.Unreal;
    }
  },
};
