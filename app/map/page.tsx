"use client";

import { useEffect, useState, useMemo } from "react";
import { MapView } from "@/components/map";

interface Via {
  fid: number;
  via: string;
  tipologia: string | null;
  extensao: number | null;
  plano_pdci: string | null;
  prazo_pdci: string | null;
  ano: number | null;
  geom: any;
}

export default function MapPage() {
  const [vias, setVias] = useState<Via[]>([]);
  const [filters, setFilters] = useState({
    tipologia: "",
    plano_pdci: "",
    prazo_pdci: "",
    ano: "",
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
                viasAll {
                  fid
                  via
                  tipologia
                  extensao
                  plano_pdci
                  prazo_pdci
                  ano
                  geom
                }
              }
            `,
          }),
        });

        const { data } = await res.json();
        setVias(data.viasAll);
      } catch (error) {
        console.error("Erro ao buscar dados GraphQL:", error);
      }
    }

    fetchData();
  }, []);

  const filteredGeoJSON = useMemo(() => {
    const filtered = vias.filter(via => {
      return (
        (filters.tipologia ? via.tipologia === filters.tipologia : true) &&
        (filters.plano_pdci ? via.plano_pdci === filters.plano_pdci : true) &&
        (filters.prazo_pdci ? via.prazo_pdci === filters.prazo_pdci : true) &&
        (filters.ano ? String(via.ano) === filters.ano : true)
      );
    });

    return {
      type: "FeatureCollection",
      features: filtered.map(via => ({
        type: "Feature",
        properties: {
          fid: via.fid,
          via: via.via,
          tipologia: via.tipologia,
          extensao: via.extensao,
          plano_pdci: via.plano_pdci,
          prazo_pdci: via.prazo_pdci,
          ano: via.ano,
        },
        geometry: via.geom,
      })),
    };
  }, [vias, filters]);

  return (
    <main className="flex-1 p-4">
      <div className="mb-4 grid grid-cols-4 gap-2">
        <select
          className="border p-2"
          value={filters.tipologia}
          onChange={(e) => setFilters({ ...filters, tipologia: e.target.value })}
        >
          <option value="">Tipologia</option>
          <option value="Ciclovia bidirecional">Ciclovia bidirecional</option>
          <option value="Ciclovia unidirecional">Ciclovia unidirecional</option>
          <option value="Passeio compartilhado">Passeio compartilhado</option>
          <option value="Ciclorrota">Ciclorrota</option>
        </select>

        <select
          className="border p-2"
          value={filters.plano_pdci}
          onChange={(e) => setFilters({ ...filters, plano_pdci: e.target.value })}
        >
          <option value="">Plano PDCI</option>
          <option value="Não Contido">Não Contido</option>
          <option value="Contido">Contido</option>
          <option value="Não Executado">Não Executado</option>
        </select>

        <select
          className="border p-2"
          value={filters.prazo_pdci}
          onChange={(e) => setFilters({ ...filters, prazo_pdci: e.target.value })}
        >
          <option value="">Prazo PDCI</option>
          <option value="Curto Prazo">Curto Prazo</option>
          <option value="Médio Prazo">Médio Prazo</option>
          <option value="Longo Prazo">Longo Prazo</option>
        </select>

        <input
          type="number"
          className="border p-2"
          placeholder="Ano"
          value={filters.ano}
          onChange={(e) => setFilters({ ...filters, ano: e.target.value })}
        />
      </div>

      <div className="w-full h-[calc(100vh-10rem)]">
        <MapView geojsonData={filteredGeoJSON} />
      </div>
    </main>
  );
}
