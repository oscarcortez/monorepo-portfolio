import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
  navigation: { name: string; href: string }[];
};