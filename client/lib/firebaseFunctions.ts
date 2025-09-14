import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

// Interfaz para tipado TypeScript
export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  awardClaimed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Traer todos los comercios
export async function getCommerces() {
  try {
    const querySnapshot = await getDocs(collection(db, "commerce"));
    const commerces = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("📦 Comercios traídos:", commerces);
    return commerces;
  } catch (error) {
    console.error("❌ Error trayendo comercios:", error);
    return [];
  }
}

// Crear un nuevo usuario dentro de fidelityCards de un comercio
export async function addFidelityUser(
  commerceId: string,
  userData: Partial<User>,
) {
  try {
    const cardsRef = collection(db, "commerce", commerceId, "fidelityCards");
    const newUser = await addDoc(cardsRef, userData);
    console.log("✅ Usuario creado:", { id: newUser.id, ...userData });
    return newUser.id;
  } catch (error) {
    console.error("❌ Error creando usuario:", error);
    throw error;
  }
}

// Traer todos los usuarios de fidelityCards de un comercio
export async function getFidelityCards(commerceId: string): Promise<User[]> {
  try {
    const cardsRef = collection(db, "commerce", commerceId, "fidelityCards");
    const querySnapshot = await getDocs(cardsRef);

    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const user: User = {
        id: doc.id,
        name: data.name,
        email: data.email,
        points: data.points || 0,
        awardClaimed: data.awardClaimed || false,
        createdAt: data.createdAt || "",
        updatedAt: data.updatedAt || "",
      };
      console.log("📋 Usuario encontrado:", user);
      return user;
    });

    return users;
  } catch (error) {
    console.error("❌ Error fetching fidelity cards:", error);
    return [];
  }
}

// Sumar puntos a un usuario
export async function addPointsToUser(
  commerceId: string,
  userId: string,
  amount: number,
) {
  try {
    const userRef = doc(db, "commerce", commerceId, "fidelityCards", userId);
    await updateDoc(userRef, {
      points: increment(amount),
      updatedAt: new Date(),
    });
    console.log(`➕ Se sumaron ${amount} puntos al usuario ${userId}`);
  } catch (error) {
    console.error("❌ Error adding points:", error);
    throw error;
  }
}

// Canjear premio
export async function redeemUserPrize(commerceId: string, userId: string) {
  try {
    const userRef = doc(db, "commerce", commerceId, "fidelityCards", userId);
    await updateDoc(userRef, {
      awardClaimed: true,
      updatedAt: new Date(),
    });
    console.log(`🏆 Usuario ${userId} canjeó su premio`);
  } catch (error) {
    console.error("❌ Error redeeming prize:", error);
    throw error;
  }
}
