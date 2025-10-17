import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Listings from "./pages/Listings.tsx";
import Layout from "@/components/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/listings" element={<Listings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
