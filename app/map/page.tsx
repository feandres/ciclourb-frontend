"use client";

import { useEffect, useState } from "react";
import { MapView } from "@/components/map";

export default function MapPage() {
  const [geojsonData, setGeojsonData] = useState<Record<string, any> | null>(
    null
  );

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => {
        console.error("Erro ao buscar geojson:", error);
      });
  }, []);

  return (
    <main className="flex-1">
      {geojsonData && (
        <div className="w-full h-[calc(100vh-8rem)]"> 
          <MapView geojsonData={geojsonData} />
        </div>
      )}
    </main>
  );
}
