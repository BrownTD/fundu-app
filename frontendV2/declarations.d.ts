declare module '@rainbow-me/animated-charts';
declare module "*.svg" {
    import * as React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
  }