import React, { useContext, useState } from "react";
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLogo,
  SSidebar,
  SSidebarButton,
  STheme,
  SThemeLabel,
  SThemeToggler,
  SToggleThumb,
} from "./styles";
import {
  AiOutlineApartment,
  AiOutlineFileText,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineUser,
} from "react-icons/ai";
import { ThemeContext } from "./../../App";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { setTheme, theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <SSidebar isOpen={sidebarOpen}>
      <>
        <SSidebarButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((p) => !p)}
        >
          <AiOutlineLeft />
        </SSidebarButton>
      </>
      <SLogo isOpen={sidebarOpen}>
        <img src="src/assets/valuecase_logo.png" alt="logo"></img>
      </SLogo>

      <SDivider />
      {linksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
            <SLinkIcon>{icon}</SLinkIcon>
            {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
      <STheme>
        {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
        <SThemeToggler
          isActive={theme === "dark"}
          onClick={() =>
            setTheme((p: string) => (p === "light" ? "dark" : "light"))
          }
        >
          <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
        </SThemeToggler>
      </STheme>
    </SSidebar>
  );
};

const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Statistics",
    icon: <AiOutlineFileText />,
    to: "/statistics",
  },
  {
    label: "Customers",
    icon: <AiOutlineUser />,
    to: "/customers",
  },
  {
    label: "Diagrams",
    icon: <AiOutlineApartment />,
    to: "/diagrams",
  },
];

export default Sidebar;
