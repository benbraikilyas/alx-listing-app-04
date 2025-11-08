import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
// PropertyDetail component not present in repo; render inline instead

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`);
  setProperty(response.data as any);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{property.title || property.name || `Property ${property.id}`}</h1>
      <p className="mt-4">{property.description || "No description"}</p>
      <div className="mt-4">
        <strong>Price:</strong> {property.price || "N/A"}
      </div>
    </div>
  );
}