import React, { useEffect, useState } from "react";
import axios from "axios";

// This is the way you import image src s
import logo from "./assets/valuecase_logo.png";

// You can use plain CSS ...

import { darkTheme, lightTheme } from "./styles/theme";

// styled components ...
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import { Route, Routes as RoutesWrapper } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyle";
import HomePage from "./pages/HomePage";

// or install anything else, which helps you, to get CSS in here
export const ThemeContext = React.createContext<any>(null);

function App() {
  const [apiPing, setApiPing] = useState("");
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  const fileInput = React.createRef<HTMLInputElement>();

  const pingApi = (e?: any) => {
    if (e) e.preventDefault();

    // the call /api is proxied to the server > see vite.config.ts
    axios
      .get("/api")
      .then((res) => {
        console.log(res);
        setApiPing(res.data);
      })
      .catch((err) => {
        setApiPing("Error = " + err.toString());
      });
  };

  const uploadImage = (e: any) => {
    const file = fileInput.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file, file.name);
      axios
        .post("/api/images/upload", formData)
        .then((res) => {
          window.open(`/api/images/${res.data.id}`);
        })
        .catch((err) => {
          alert("Error = " + err.toString());
        });
    }
  };

  useEffect(() => {
    pingApi();
  }, []);

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />
        <RoutesWrapper>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route path="/statistics" element={<h1>Statistics Page</h1>} />
          <Route path="/customers" element={<h1>Customers Page</h1>} />
          <Route path="/diagrams" element={<h1>Diagrams Page</h1>} />
        </RoutesWrapper>
        {/* <div className="App">
            <h1>Have fun 🐿</h1>
            <hr />
            <br />

            <img src={logo} className="App-logo" alt="logo" />
            <br />
            <br />
            <hr />
            <br />

            <code>{apiPing ?? "–"}</code>
            <br />
            <br />
            <StyledButton onClick={pingApi}>ping API</StyledButton>
            <hr />

            <input
              ref={fileInput}
              type={"file"}
              accept="image/png, image/jpeg"
            />
            <StyledButton onClick={uploadImage}>upload</StyledButton>
          </div> */}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
