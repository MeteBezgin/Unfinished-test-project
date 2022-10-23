import React from "react";
import { ReactNode } from "react";
import { JsxElement } from "typescript";
import Sidebar from "../Sidebar/Sidebar";
import { SLayout, SMain } from "./styles";

interface ILayout {
  children: JSX.Element;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <SLayout>
      <Sidebar />
      <SMain>{children}</SMain>
    </SLayout>
  );
};

export default Layout;
