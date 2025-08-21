"use client";

import { useEffect, useState, useMemo } from "react";
import { MapView } from "@/components/map";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export default function MapPage() {
  const [malhas, setMalhas] = useState<any[]>([]);
  const [zonas30, setZonas30] = useState<any[]>([]);
  const [bicicletares, setBicicletares] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
  const [contagens, setContagens] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);

  const [filters, setFilters] = useState({
    tipologia: "",
    sentido: "",
    prazo: "",
    executado: "",
    ano: "",
    dentro_do_prazo: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [malhaRes, zonasRes, biciRes, contRes] = await Promise.all([
          fetch("http://localhost:3001/malha-pdci").then(res => res.json()),
          fetch("http://localhost:3001/zonas30").then(res => res.json()),
          fetch("http://localhost:3001/bicicletar").then(res => res.json()),
          fetch("http://localhost:3001/contagem/contagens").then(res => res.json()),
        ]);

        setMalhas(malhaRes);
        setZonas30(zonasRes);
        setBicicletares(biciRes);
        setContagens(contRes); 

        console.log("GeoJSON Contagens:", contRes);
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
        (filters.sentido ? malha.sentido === filters.sentido : true) &&
        (filters.prazo ? malha.prazo === filters.prazo : true) &&
        (filters.executado ? malha.executado === filters.executado : true) &&
        (filters.ano ? malha.ano === filters.ano : true) &&
        (filters.dentro_do_prazo ? malha.dentro_do_prazo === filters.dentro_do_prazo : true)
      );
    });

    return {
      type: "FeatureCollection" as const,
      features: filtered.map(malha => ({
        type: "Feature" as const,
        properties: {
          id: malha.id,
          fid: malha.fid,
          name: malha.name,
          trecho: malha.trecho,
          tipologia: malha.tipologia,
          sentido: malha.sentido,
          prazo: malha.prazo,
          executado: malha.executado,
          ano: malha.ano,
          dentro_do_prazo: malha.dentro_do_prazo,
          obs: malha.obs,
          extensao: malha.extensao,
          extensao_executada: malha.extensao_executada,
        },
        geometry: malha.geom,
      })),
    };
  }, [malhas, filters]);

  const filteresZonas30GeoJSON = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: zonas30.map(zona30 => ({
      type: "Feature" as const,
      properties: {
        id: zona30.id,
        fid: zona30.fid,
        name: zona30.name,
      },
      geometry: zona30.geom,
    })),
  }), [zonas30]);

  return (
    <div className="w-full h-full">
      {bicicletares && (
        <MapView 
          malhaData={filteredMalhaGeoJSON} 
          zonas30Data={filteresZonas30GeoJSON}
          bicicletarData={bicicletares} 
          contagensData={contagens ?? undefined}
        />
      )}
    </div>
  );
}
