import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface PageControlProperties {
  style?: StyleProp<ViewStyle>;
  numberOfPages: number;
  progress?: number;
  animationDuration?: number;
  margin?: number;
  activeTintColor?: string;
  hidesForSinglePage?: boolean;
}

export interface PageControlAjiProperties extends PageControlProperties {
  radius?: number;
  inactiveTransparency?: number;
  inactiveBorderColor?: string;
  inactiveTintColor?: string;
}

export interface PageControlAleppoProperties extends PageControlProperties {
  radius?: number;
  inactiveTransparency?: number;
  inactiveBorderColor?: string;
  inactiveTintColor?: string;
}

export interface PageControlJaloroProperties extends PageControlProperties {
  width?: number;
  height?: number;
  borderRadius?: number;
  inactiveTransparency?: number;
  inactiveTintColor?: string;
}

export interface PageControlPoblanoProperties extends PageControlProperties {
  radius?: number;
  inactiveBorderColor?: string;
  activeTransparency?: number;
}

export class PageControlAji extends React.Component<PageControlAjiProperties, {}> {}
export class PageControlAleppo extends React.Component<PageControlAleppoProperties, {}> {}
export class PageControlJaloro extends React.Component<PageControlJaloroProperties, {}> {}
export class PageControlPoblano extends React.Component<PageControlPoblanoProperties, {}> {}
