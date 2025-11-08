import axios from "axios";
import { useEffect, useState } from "react";
// Simple inline property card rendering (PropertyCard component not present in this repo)

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`);
  setProperties(response.data as any[]);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {properties.map((property) => (
        <div key={property.id} className="border p-4 rounded">
          <h3 className="font-bold">{property.title || property.name || `Property ${property.id}`}</h3>
          <p>{property.description || "No description"}</p>
        </div>
      ))}
    </div>
  );
}