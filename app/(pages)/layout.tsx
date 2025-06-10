import React from "react";
import { Header } from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Header>{children}</Header>;
};

export default layout;
