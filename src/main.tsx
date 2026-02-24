import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/hooks/useThemes";
import { D2YToastProvider } from "@/components/ui/D2YToast";
import AppRouter from "@/router";
import "@/styles/globals.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <D2YToastProvider>
        <AppRouter />
      </D2YToastProvider>
    </ThemeProvider>
  </StrictMode>
);
