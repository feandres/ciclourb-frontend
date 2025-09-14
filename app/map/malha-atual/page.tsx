"use client";

import { useEffect, useState, useMemo } from "react";
import { MapView } from "@/components/mapComponents/map";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import api from "@/services/api";

export default function MapPage() {
  const [malhas, setMalhas] = useState<any[]>([]);
  const [bicicletares, setBicicletares] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
  const [contagens, setContagens] = useState<FeatureCollection<Geometry, GeoJsonProperties> | undefined>(undefined);
  const [loadingContagens, setLoadingContagens] = useState(false);

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
          api.get(`/malha-atual`).then(res => res.data),
          api.get(`/bicicletar`).then(res => res.data),
          api.get(`/pontos-contagem`).then(res => res.data),
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

  useEffect(() => {
    const filterContagens = async () => {
      setLoadingContagens(true);
      try {
        const response = await api.get(
          filters.ano ? "pontos-contagem/findAllByYear" : "pontos-contagem",
          { params: filters.ano ? { ano: filters.ano } : {} }
        );
        setContagens({
          type: response.data.type,
          features: response.data.features ? response.data.features : []
        });
      } finally {
        setLoadingContagens(false);
      }
    }

    filterContagens();
  }, [filters.ano]);

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

  return (
    <div className="w-full h-full">
      {bicicletares && ( loadingContagens ? (
        <p>Carregando</p>
      ) : (
        <MapView 
          malhaData={filteredMalhaGeoJSON} 
          bicicletarData={filteredBicicletares} 
          contagensData={contagens}
          filters={filters}
          setFilters={setFilters}
        />
      )
      )}
    </div>
  );
}
