import { useState, useEffect } from "react";
import {
  getFidelityCards,
  addPointsToUser,
  redeemUserPrize,
  User,
} from "../lib/firebaseFunctions";

export function useCardPage(commerceId: string, userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Trae el usuario una vez al montar
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const users = await getFidelityCards(commerceId);
        const currentUser = users.find((u) => u.id === userId) || null;
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [commerceId, userId]);

  // Refresh automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const users = await getFidelityCards(commerceId);
        const currentUser = users.find((u) => u.id === userId) || null;
        setUser(currentUser);
      } catch (error) {
        console.error("Error refreshing user:", error);
      }
    }, 5000); // 5000ms = 5 segundos

    return () => clearInterval(interval);
  }, [commerceId, userId]);

  const addPoints = async (amount: number) => {
    if (!user) return;
    await addPointsToUser(commerceId, user.id, amount);
    setUser({ ...user, points: user.points + amount });
  };

  const redeemPrize = async () => {
    if (!user) return;
    await redeemUserPrize(commerceId, user.id);
    setUser({ ...user, awardClaimed: true });
  };

  return { user, loading, addPoints, redeemPrize };
}


