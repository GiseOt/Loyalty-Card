import { useEffect, useState } from "react";
import { User } from "../lib/firebaseFunctions";

interface LoyaltyCardProps {
  storeName: string;
  maxStamps: number;
  user: User;
}

export default function LoyaltyCard({
  storeName,
  maxStamps,
  user,
}: LoyaltyCardProps) {
  const [stamps, setStamps] = useState<number>(user.points ?? 0);

  // Actualiza los sellos si los puntos del usuario cambian
  useEffect(() => {
    setStamps(user.points ?? 0);
  }, [user.points]);

  const progress = (stamps / maxStamps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white text-center">
            <p className="text-sm mb-1">
              Hola, <span className="font-semibold">{user.name}</span> 👋
            </p>
            <h1 className="text-2xl font-bold">{storeName}</h1>
            <p className="text-indigo-100 mt-1">Tarjeta de Fidelización</p>
          </div>

          {/* Card Content */}
          <div className="p-8 text-center">
            {/* Progress Section */}
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {stamps}/{maxStamps}
            </div>
            <p className="text-gray-600 mb-4">Sellos conseguidos</p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Stamps Visualization */}
            <div className="grid grid-cols-5 gap-3 mb-8">
              {[...Array(maxStamps)].map((_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    index < stamps
                      ? "bg-gradient-to-br from-indigo-500 to-purple-500 border-indigo-500 text-white shadow-lg transform scale-110"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }`}
                >
                  {index < stamps ? "✓" : index + 1}
                </div>
              ))}
            </div>

            {stamps >= maxStamps && (
              <div className="text-green-600 font-bold text-lg">
                🎉 ¡Tarjeta Completa!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
