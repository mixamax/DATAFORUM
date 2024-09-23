import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
