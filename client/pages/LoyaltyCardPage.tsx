import { useParams } from "react-router-dom";
import LoyaltyCard from "../components/LoyaltyCard";
import { useCardPage } from "../hooks/useCardPage"; // tu hook
import { useEffect } from "react";

export default function LoyaltyCardPage() {
  // Tomamos parámetros de la URL
  const { commerceSlug, userId } = useParams<{
    commerceSlug: string;
    userId: string;
  }>();

  if (!commerceSlug || !userId) return <p>Parámetros no encontrados</p>;

  // Usamos tu hook con el commerceId (o commerceSlug) y userId
  const { user, loading } = useCardPage(commerceSlug, userId);

  if (loading) return <p>Cargando tarjeta...</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  return <LoyaltyCard storeName={commerceSlug} maxStamps={10} user={user} />;
}
