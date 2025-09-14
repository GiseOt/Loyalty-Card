import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFidelityUser } from "../lib/firebaseFunctions";

interface RegisterProps {
  commerceName: string;
}

export default function Register({ commerceName }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newUser = {
        name,
        email,
        points: 0,
        awardClaimed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Crear usuario en Firestore
      const userId = await addFidelityUser(commerceName, newUser);

      // Redirigir a la tarjeta del usuario
      navigate(`/card/${commerceName}/${userId}`);
    } catch (err) {
      console.error("Error creando usuario:", err);
      alert("Ocurrió un error al crear el usuario. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Registro - {commerceName}
        </h1>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          {loading ? "Creando usuario..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
