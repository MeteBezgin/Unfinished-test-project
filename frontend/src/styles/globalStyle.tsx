import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle<{
  theme: DefaultTheme & {
    bg: string;
    bgAlpha: string;
    bg2: string;
    bg3: string;
    text: string;
    primary: string;
  };
}>`
    *, *::before, *::after {
        margin: 0;
        box-sizing: border-box;
    }
    body {
        background: ${({ theme }) => theme.bg2};
        color: ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
    }
`;
