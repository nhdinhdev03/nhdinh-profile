import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./utils/styles/css/tailwind.css";

// Global error handlers for browser extension errors
window.addEventListener("error", (event) => {
  // Ignore QuillBot and other extension errors
  if (
    event.error?.stack?.includes("quillbot") ||
    event.error?.stack?.includes("extension") ||
    event.filename?.includes("extension") ||
    event.filename?.includes("chrome-extension") ||
    event.error?.message?.includes("editorId") ||
    event.error?.message?.includes("quillbot")
  ) {
    event.preventDefault();
    console.warn(
      "Browser extension error ignored:",
      event.error?.message || "Unknown extension error"
    );
    return false;
  }
});

window.addEventListener("unhandledrejection", (event) => {
  // Ignore QuillBot and other extension promise rejections
  if (
    event.reason?.stack?.includes("quillbot") ||
    event.reason?.stack?.includes("extension") ||
    event.reason?.stack?.includes("chrome-extension") ||
    event.reason?.message?.includes("editorId") ||
    event.reason?.message?.includes("quillbot")
  ) {
    event.preventDefault();
    console.warn(
      "Browser extension promise rejection ignored:",
      event.reason?.message || "Unknown extension rejection"
    );
    return false;
  }
});

// Additional protection for QuillBot specific errors
const originalConsoleError = console.error;
console.error = function (...args) {
  const errorString = args.join(" ");
  if (
    errorString.includes("quillbot") ||
    errorString.includes("editorId") ||
    errorString.includes("chrome-extension")
  ) {
    console.warn("Extension error suppressed:", ...args);
    return;
  }
  originalConsoleError.apply(console, args);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
