import React from "react";
import ReactDOM from "react-dom/client";
import "./firebase.js";
import App from "./components/App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "./contexts/AuthContext.js";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
