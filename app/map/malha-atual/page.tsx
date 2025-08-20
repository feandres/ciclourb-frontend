"use client";

import { useEffect, useState, useMemo, useContext } from "react";
import { MapView } from "@/components/map";
import { useFilterContext } from "@/contexts/FilterContext";

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

interface Zonas30All{
  id: number;
  fid: number;
  name: number;
  geom: any;
}

interface Bicicletar {
  fid: string;
  name: string;
  id_estacao: string;
  vagas_atuais: string;
  ano_inauguracao: string;
  bairro: string;
  regional: string;
  long: string;
  lat: string;
  geom: any;
}

export default function MapPage() {
  const [malhas, setMalhas] = useState<MalhaPDCI[]>([]);
  const [zonas30, setZonas30] = useState<Zonas30All[]>([]);
  const [bicicletares, setBicicletares] = useState<Bicicletar[]>([]);

  const { filters } = useFilterContext();

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
                },
                zonas30All{
                  name
                  geom
                },
                bicicletarAll{
                  fid
                  name
                  id_estacao
                  vagas_atuais
                  ano_inauguracao
                  bairro
                  regional
                  long
                  lat
                  geom
                }
              }
            `,
          }),
        });

        const { data } = await res.json();
        setMalhas(data.malhaPDCIAll);
        setZonas30(data.zonas30All);
        setBicicletares(data.bicicletarAll);
      } catch (error) {
        console.error("Erro ao buscar dados GraphQL:", error);
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

  const filteresZonas30GeoJSON = useMemo(() => {

    return {
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
    };
  }, [zonas30]);

  const filteresBicletarGeoJSON = useMemo(() => {

    return {
      type: "FeatureCollection" as const,
      features: bicicletares.map(bicicletar => ({
        type: "Feature" as const,
        properties: {
          fid: bicicletar.fid,
          name: bicicletar.name,
          id_estacao: bicicletar.id_estacao,
          vagas_atuais: bicicletar.vagas_atuais,
          ano_inauguracao: bicicletar.ano_inauguracao,
          bairro: bicicletar.bairro,
          regional: bicicletar.regional,
          long: bicicletar.long,
          lat: bicicletar.lat,
        },
        geometry: bicicletar.geom,
      })),
    };
  }, [bicicletares]);

  return (
    <div className="w-full h-full">
      <MapView 
        malhaData={filteredMalhaGeoJSON} 
        zonas30Data={filteresZonas30GeoJSON}
        bicicletarData={filteresBicletarGeoJSON}
      />
    </div>
  );
}