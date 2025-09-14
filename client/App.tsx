import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import LoyaltyCardPage from "./pages/LoyaltyCardPage";

const queryClient = new QueryClient();

// Wrapper para pasar commerceId a AdminPage
function AdminPageWrapper() {
  const { commerceId } = useParams<{ commerceId: string }>();
  if (!commerceId) return <p>No hay commerceId</p>;
  return <AdminPage commerceId={commerceId} />;
}

// Wrapper para pasar commerceSlug a Register
function RegisterWrapper() {
  const { commerceSlug } = useParams<{ commerceSlug: string }>();
  if (!commerceSlug) return <p>No se encontró el comercio</p>;
  return <Register commerceName={commerceSlug} />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route
            path="/card/:commerceSlug/:userId"
            element={<LoyaltyCardPage />}
          />
          <Route path="/admin/:commerceId" element={<AdminPageWrapper />} />
          <Route path="/register/:commerceSlug" element={<RegisterWrapper />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
