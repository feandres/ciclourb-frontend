"use client";

import { useEffect, useState, useMemo } from "react";
import { MapView } from "@/components/map";

interface MalhaPDCI {
  id: number;
  fid: number;
  name: string;
  trecho: string;
  tipologia: string;
  sentido: string;
  prazo: string;
  executado: string;
  ano: string;
  dentro_do_prazo: string;
  obs: string | null;
  extensao: number;
  extensao_executada: number;
  geom: any;
}

interface GeoJSONFeature {
  type: "Feature";
  properties: {
    id: number;
    fid: number;
    name: string;
    trecho: string;
    tipologia: string;
    sentido: string;
    prazo: string;
    executado: string;
    ano: string;
    dentro_do_prazo: string;
    obs: string | null;
    extensao: number;
    extensao_executada: number;
  };
  geometry: any;
}

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Extend the MapView props to include geojsonData
declare module "@/components/map" {
  interface Props {
    geojsonData: GeoJSONFeatureCollection;
  }
}

export default function MapPage() {
  const [malhas, setMalhas] = useState<MalhaPDCI[]>([]);
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
        const res = await fetch("http://localhost:3001/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                malhaPDCIAll {
                  id
                  fid
                  name
                  trecho
                  tipologia
                  sentido
                  prazo
                  executado
                  ano
                  dentro_do_prazo
                  obs
                  extensao
                  extensao_executada
                  geom
                }
              }
            `,
          }),
        });

        const { data } = await res.json();
        setMalhas(data.malhaPDCIAll);
      } catch (error) {
        console.error("Erro ao buscar dados GraphQL:", error);
      }
    }

    fetchData();
  }, []);

  const filteredGeoJSON = useMemo((): GeoJSONFeatureCollection => {
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
      type: "FeatureCollection",
      features: filtered.map(malha => ({
        type: "Feature",
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

  const handleFilterChange = (filterKey: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  return (
    <main className="flex-1 p-4">
      <div className="mb-4 grid grid-cols-3 gap-2">
        <select
          className="border p-2 rounded"
          value={filters.tipologia}
          onChange={(e) => handleFilterChange('tipologia', e.target.value)}
        >
          <option value="">Tipologia</option>
          <option value="Ciclofaixa">Ciclofaixa</option>
          <option value="Ciclovia">Ciclovia</option>
          <option value="Passeio compartilhado">Passeio compartilhado</option>
          <option value="Ciclorrota">Ciclorrota</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filters.sentido}
          onChange={(e) => handleFilterChange('sentido', e.target.value)}
        >
          <option value="">Sentido</option>
          <option value="Bidirecional">Bidirecional</option>
          <option value="Unidirecional">Unidirecional</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filters.prazo}
          onChange={(e) => handleFilterChange('prazo', e.target.value)}
        >
          <option value="">Prazo</option>
          <option value="Curto">Curto</option>
          <option value="Médio">Médio</option>
          <option value="Longo">Longo</option>
        </select>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <select
          className="border p-2 rounded"
          value={filters.executado}
          onChange={(e) => handleFilterChange('executado', e.target.value)}
        >
          <option value="">Executado</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filters.dentro_do_prazo}
          onChange={(e) => handleFilterChange('dentro_do_prazo', e.target.value)}
        >
          <option value="">Dentro do Prazo</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>

        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Ano"
          value={filters.ano}
          onChange={(e) => handleFilterChange('ano', e.target.value)}
        />
      </div>

      <div className="w-full h-[calc(100vh-12rem)]">
        {/* <MapView geojsonData={filteredGeoJSON} /> */}
      </div>
    </main>
  );
}