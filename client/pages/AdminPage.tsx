import { useEffect, useState } from "react";
import {
  getFidelityCards,
  addPointsToUser,
  redeemUserPrize,
} from "../lib/firebaseFunctions";

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  awardClaimed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage({ commerceId }: { commerceId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getFidelityCards(commerceId);
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, [commerceId]);

  const handleAddPoints = async (userId: string) => {
    try {
      await addPointsToUser(commerceId, userId, 1);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, points: u.points + 1 } : u)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedeemPrize = async (userId: string) => {
    try {
      await redeemUserPrize(commerceId, userId);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, awardClaimed: true } : u)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return <p className="text-gray-500 animate-pulse">Cargando usuarios...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-700">Panel Admin</h1>
          <p className="text-indigo-500 mt-2">Comercio: {commerceId}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Usuarios registrados
          </h2>

          {users.length === 0 ? (
            <p className="text-gray-500">No hay usuarios registrados.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4"
                >
                  <div>
                    <p className="text-gray-800 font-medium text-lg">
                      {u.name}
                    </p>
                    <p className="text-gray-500 text-sm">{u.email}</p>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center gap-4">
                    <span className="font-semibold text-gray-700">
                      {u.points} pts
                    </span>

                    <button
                      onClick={() => handleAddPoints(u.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors"
                    >
                      +1 punto
                    </button>

                    {u.awardClaimed ? (
                      <span className="text-green-600 font-semibold">
                        ✅ Premio retirado
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRedeemPrize(u.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        Canjear premio
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
