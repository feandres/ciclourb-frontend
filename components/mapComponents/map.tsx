"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { buildMalhaLayer } from "./layers/buildMalhaLayer";
import { buildZonas30Layer } from "./layers/buildZonas30Layer";
import { buildContagemLayer } from "./layers/buildContagemLayer";
import { buildBicicletarLayer } from "./layers/buildBicicletarLayer";
import { buildMalhaExistenteLayer } from "./layers/buildMalhaExistenteLayer";

interface Props {
  malhaData: FeatureCollection<Geometry, GeoJsonProperties>;
  zonas30Data?: FeatureCollection<Geometry, GeoJsonProperties>;
  bicicletarData?: FeatureCollection<Geometry, GeoJsonProperties> | undefined;
  contagensData?: FeatureCollection<Geometry, GeoJsonProperties>;
  malhaExistenteData?: any;
  filters: any;
  setFilters: any;
}

export function MapView({
  malhaData,
  zonas30Data,
  bicicletarData,
  contagensData,
  malhaExistenteData,
  filters,
  setFilters
}: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  const [baseLayer, setBaseLayer] = useState<"raster" | "vector">("vector");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [panelExpanded, setPanelExpanded] = useState(true);
  const [isMalhaExistente, setIsMalhaExistente] = useState("Não");

  const [layersVisibility, setLayersVisibility] = useState({
    "ciclofaixa": true,
    ciclovia: true,
    ciclorrota: true,
    passeio: true,
    zonas30: true,
    bicicletar: true,
    contagem: true,
  });

  const tipologiaColors: Record<string, string> = {
    ciclofaixa: "#34A6F4",
    ciclovia: "#e63946",
    ciclorrota: "#E07816",
    passeio: "#10B02E",
  };

  const layerConfigs = [
    { key: "ciclofaixa", label: "Ciclofaixa", color: tipologiaColors.ciclofaixa, isPoint: false },
    { key: "ciclovia", label: "Ciclovia", color: tipologiaColors.ciclovia, isArea: false },
    { key: "ciclorrota", label: "Ciclorrota", color: tipologiaColors.ciclorrota },
    {
      key: "passeio",
      label: "Passeio Compartilhado",
      color: tipologiaColors.passeio,
    },
    {
      key: "contagem",
      label: "Contagem",
      color: "#2a9d8f",
    },
  ];

  if (bicicletarData) {
    layerConfigs.push({
      key: "bicicletar",
      label: "Bicicletar",
      color: "#10b981",
      isPoint: true,
    })
  }

  if (zonas30Data) {
    layerConfigs.push(
    {
      key: "zonas30",
      label: "Zonas 30",
      color: "#ffb703",
      isArea: true,
    })
  }

  const getVisibleLayersCount = () => {
    return Object.values(layersVisibility).filter(Boolean).length;
  };

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: { version: 8, sources: {}, layers: [] },
      center: [-38.5263, -3.7418],
      zoom: 13,
      minZoom: 11,
      maxZoom: 17,
      maxBounds: [
        [-38.75, -3.9],
        [-38.35, -3.65],
      ],
    });

    mapRef.current = map;

    map.on("load", () => {
      setMapLoaded(true);

      map.addSource("raster-tiles", {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
      });

      map.addLayer({
        id: "raster-layer",
        type: "raster",
        source: "raster-tiles",
        layout: { visibility: baseLayer === "raster" ? "visible" : "none" },
      });

      map.addSource("vector-tiles", {
        type: "raster",
        tiles: [
          "https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",
        ],
        tileSize: 256,
      });

      map.addLayer({
        id: "vector-layer",
        type: "raster",
        source: "vector-tiles",
        layout: { visibility: baseLayer === "vector" ? "visible" : "none" },
      });

      if (isMalhaExistente === "Não") {
        buildMalhaLayer(map, mapRef, malhaData);
      } else {
        buildMalhaExistenteLayer(map, mapRef, malhaExistenteData);
      }

      if (contagensData) {
        buildContagemLayer(map, mapRef, contagensData);
      }

      if (zonas30Data) {  
        buildZonas30Layer(map, zonas30Data);
      }

      if (bicicletarData) {
        buildBicicletarLayer(map, mapRef, bicicletarData);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, [malhaData, zonas30Data, bicicletarData, isMalhaExistente]);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    mapRef.current.setLayoutProperty(
      "raster-layer",
      "visibility",
      baseLayer === "raster" ? "visible" : "none"
    );
    mapRef.current.setLayoutProperty(
      "vector-layer",
      "visibility",
      baseLayer === "vector" ? "visible" : "none"
    );
  }, [baseLayer, mapLoaded]);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    Object.entries(layersVisibility).forEach(([layer, visible]) => {
      if (mapRef.current?.getLayer(layer)) {
        mapRef.current.setLayoutProperty(
          layer,
          "visibility",
          visible ? "visible" : "none"
        );
      }
    });
  }, [layersVisibility, mapLoaded]);

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <div ref={mapContainer} className="h-full w-full" />

      <div
        className={`absolute top-4 left-4 z-10 bg-[#FFF8E5] backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 transition-all duration-300 ${
          panelExpanded ? "w-80" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-2">
          {panelExpanded && (
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Camadas</h2>
                <p className="text-xs text-gray-500">
                  {getVisibleLayersCount()}/{layerConfigs.length} ativas
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setPanelExpanded(!panelExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ml-auto"
          >
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                panelExpanded ? "rotate-0" : "rotate-180"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {panelExpanded && (
          <>
            <div className="p-4">
              <div className="flex rounded-lg bg-[#FFF8E5] p-1">
                <button
                  onClick={() => setBaseLayer("vector")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    baseLayer === "vector"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Mapa
                </button>
                <button
                  onClick={() => setBaseLayer("raster")}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    baseLayer === "raster"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Satélite
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Camadas Disponíveis
              </h3>

              {layerConfigs.map(({ key, label, color, isArea, isPoint }) => (
                <label key={key} className="group cursor-pointer">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={
                          layersVisibility[key as keyof typeof layersVisibility]
                        }
                        onChange={() =>
                          setLayersVisibility((prev) => ({
                            ...prev,
                            [key]: !prev[key as keyof typeof layersVisibility],
                          }))
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          layersVisibility[key as keyof typeof layersVisibility]
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 group-hover:border-gray-400"
                        }`}
                      >
                        {layersVisibility[
                          key as keyof typeof layersVisibility
                        ] && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 border border-white shadow-sm ${
                            isPoint
                              ? "rounded-full"
                              : isArea
                              ? "rounded opacity-60"
                              : "rounded-sm"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {label}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                        layersVisibility[key as keyof typeof layersVisibility]
                          ? "opacity-100"
                          : ""
                      }`}
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </label>
              ))}
              <select
                className="p-2 m-2"
                value={filters.ano}
                onChange={(e) => setFilters({ ...filters, ano: e.target.value })}
                >
                <option value="" disabled>Selecione um ano</option>
                <option value="">Todos os anos</option>
                <option value="no_date">Sem data definida</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2007">2007</option>
                <option value="2004">2004</option>
                <option value="2000">2000</option>
              </select>
              {!bicicletarData ? (
                <select
                  className="p-2 m-2"
                  value={filters.executado}
                  onChange={(e) => setFilters({ ...filters, executado: e.target.value })}
                  >
                  <option value="" disabled>Selecione o status das vias</option>
                  <option value="">Malha completa</option>
                  <option value="Sim">Executado</option>
                  <option value="Parcial">Parcialmente executado</option>
                  <option value="Não">Não executado</option>
                </select>
              ) : (
                <select
                  className="p-2 m-2"
                  value={filters.contidoPdci}
                  onChange={(e) => setFilters({ ...filters, contidoPdci: e.target.value })}
                  >
                  <option value="" disabled>Selecione o status das vias</option>
                  <option value="">Todos</option>
                  <option value="Sim">Contido ao pdci</option>
                  <option value="Não">Não contido ao pdci</option>
                </select>
              )}
              {malhaExistenteData && (
                <select
                  className="p-2 m-2"
                  value={isMalhaExistente}
                  onChange={(e) => setIsMalhaExistente(e.target.value)}
                  >
                  <option value="Não" defaultChecked>Malha pdci</option>
                  <option value="Sim">Malha anterior à pdci</option>
                </select>
              )}
            </div>
            <div className="p-4 bg-gray-50/50 rounded-b-2xl">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Clique nas vias e estações para mais informações
              </div>
            </div>
          </>
        )}
      </div>

      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 shadow-xl flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-700 font-medium">
              Carregando mapa...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
