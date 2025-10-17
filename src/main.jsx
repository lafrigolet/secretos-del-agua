import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes } from "@mui/material";

// Create a theme that matches Tailwind’s design tokens
let theme = createTheme({
  palette: {
    primary: {
      main: "#2e2121", // black
      contrastText: "#ffffff", // text color on primary buttons
    },
    secondary: {
      main: "#ffffff", // white
      contrastText: "#000000", // text color on secondary buttons
    },
  },
  typography: {
    fontFamily: "'Raleway', sans-serif",
    h1: { fontWeight: 300, fontSize: "3.75rem" },
    h2: { fontWeight: 400, fontSize: "3rem" },
    h3: { fontWeight: 500, fontSize: "2.25rem" },
    h6: {
      fontFamily: "'Playfair Display', serif", 
      fontWeight: 400,
      fontSize: "3rem", // default (desktop)
      lineHeight: 1.2,

      // You can add media queries like this:
      "@media (max-width:900px)": {
        fontSize: "2.25rem", // tablets
      },
      "@media (max-width:600px)": {
        fontSize: "1rem", // mobile
      },
    },
    body1: { fontWeight: 400, fontSize: "1rem" },
    body2: {
      fontWeight: 400,
      fontSize: "1rem", // default (desktop)
      lineHeight: 1.2,
      
      // You can add media queries like this:
      "@media (max-width:900px)": {
        fontSize: "1rem", // tablets
      },
      "@media (max-width:600px)": {
        fontSize: "0.75rem", // mobile
      },
    },

  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
