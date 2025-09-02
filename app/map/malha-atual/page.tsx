"use client";

import { useEffect, useState, useMemo } from "react";
import { MapView } from "@/components/mapComponents/map";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE || "https://ciclourb-backend.vercel.app/api";

export default function MapPage() {
  const [malhas, setMalhas] = useState<any[]>([]);
  const [bicicletares, setBicicletares] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
  const [contagens, setContagens] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>(undefined);

  const [filters, setFilters] = useState({
    tipologia: "",
    sentido: "",
    prazo: "",
    executado: "",
    ano: "",
    dentro_do_prazo: "",
    contidoPdci: ""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [malhaRes, biciRes, contRes] = await Promise.all([
          fetch(`${API_ROUTE}/malha-atual`).then(res => res.json()),
          fetch(`${API_ROUTE}/bicicletar`).then(res => res.json()),
          fetch(`${API_ROUTE}/contagem/contagens`).then(res => res.json()),
        ]);

        setMalhas(malhaRes);
        setBicicletares(biciRes);
        setContagens(contRes); 
        
      } catch (error) {
        console.error("Erro ao buscar dados da API REST:", error);
      }
    }

    fetchData();
  }, []);

  const filteredMalhaGeoJSON = useMemo(() => {
    const filtered = malhas.filter(malha => {
      return (
        (filters.tipologia ? malha.tipologia === filters.tipologia : true) &&
        (filters.ano ? malha.ano == filters.ano : true) && 
        (filters.contidoPdci ? malha.pdci === filters.contidoPdci : true)
      );
    });

    return {
      type: "FeatureCollection" as const,
      features: filtered.map(malha => ({
        type: "Feature" as const,
        properties: {
          id: malha.id,
          fid: malha.fid,
          pdci: malha.pdci,
          tipologia: malha.tipologia,
          ano: malha.ano,
          extensao: malha.extensao,
        },
        geometry: malha.geom,
      })),
    };
  }, [malhas, filters]);

  const filteredBicicletares = useMemo(() => {
    if (!bicicletares) return undefined;

    const filtered = bicicletares.features.filter(bicicletar => {
      
      if (filters.ano === "no_date") {
        return (
          (bicicletar?.properties?.ano_inauguracao === null)
        )
      }

      return (
        (filters.ano ? bicicletar?.properties?.ano_inauguracao == filters.ano : true)
      )
    });

    return {
      type: "FeatureCollection" as const,
      features: filtered
    };
  }, [bicicletares, filters]);

  const filteredContagens = useMemo(() => {
    if (!contagens) return undefined;

    const filtered = contagens.features.filter(contagem => {
      return (
        (filters.ano ? contagem?.properties?.ano == filters.ano : true)
      )
    });

    return {
      type: "FeatureCollection" as const,
      features: filtered
    };
  }, [contagens, filters])

  return (
    <div className="w-full h-full">
      {bicicletares && (
        <MapView 
          malhaData={filteredMalhaGeoJSON} 
          bicicletarData={filteredBicicletares} 
          contagensData={filteredContagens}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
}
