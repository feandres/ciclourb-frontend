"use client";

import { useEffect, useState } from "react";
import { MapView } from "@/components/map";
import { Indicators } from "@/components/indicators";
import { ChartsSection } from "@/components/charts";

export default function DataPage() {
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
    <div className="flex flex-col">

      <Indicators />

      <section className="py-6 container mx-auto px-4">
        {geojsonData && <MapView geojsonData={geojsonData} />}
      </section>

      <ChartsSection />

      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Sobre o projeto</h2>
        <p className="text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris.
        </p>
      </section>
    </div>
  );
}
