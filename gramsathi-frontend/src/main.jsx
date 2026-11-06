import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { EquipmentProvider } from "./context/EquipmentContext";
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EquipmentProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </EquipmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);