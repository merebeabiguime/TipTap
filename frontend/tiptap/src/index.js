import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./components/App.js";
import { UserContextProvider } from "./contexts/AuthContext.js";
import "./firebase.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider
      options={{ clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </PayPalScriptProvider>
  </QueryClientProvider>
  //</React.StrictMode>
);
