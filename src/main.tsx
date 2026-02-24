// ============================================================
// MAIN ENTRY POINT
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/hooks/useThemes";
import AppRouter from "@/router";
import "@/styles/globals.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);
