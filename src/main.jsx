import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import App1 from "./App1";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        
      }}
    >
      <App />

      <App1 />
    </div>
  </React.StrictMode>
);
