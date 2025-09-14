import { useEffect, useState } from "react";
import LoyaltyCard from "../components/LoyaltyCard";
import { getCommerces } from "../lib/firebaseFunctions";

export default function Index() {
  const [commerces, setCommerces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getCommerces(); // trae { id, name, ... } de Firestore
      setCommerces(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p>Cargando comercios...</p>;
  if (commerces.length === 0) return <p>No hay comercios registrados.</p>;

  return (
    <div>
      <h1>Comercios</h1>
      {commerces.map((store) => (
        <LoyaltyCard
          key={store.id}
          storeName={store.name}
          maxStamps={store.maxStamps || 10}
        />
      ))}
    </div>
  );
}
