"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";
import { createRoot } from "react-dom/client";
import MalhaPopup from "./malhaPopup";

interface Props {
  malhaData: FeatureCollection<Geometry, GeoJsonProperties>;
  zonas30Data: FeatureCollection<Geometry, GeoJsonProperties>;
  bicicletarData: FeatureCollection<Geometry, GeoJsonProperties>;
  contagensData?: FeatureCollection<Geometry, GeoJsonProperties>;
}

const BicicletarPopup = ({ props }: { props: any }) => {
  const vagas = props.vagas_atuais || props.vagas || props.capacidade || 0;
  const nome = props.nome || props.name || props.station_name || "Estação";
  const endereco = props.endereco || props.address || props.location || "";

  return (
    <div className="p-4 min-w-64 max-w-80">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <h3 className="font-bold text-gray-800 text-lg">{nome}</h3>
      </div>

      {endereco && (
        <div className="mb-3">
          <p className="text-sm text-gray-600">{endereco}</p>
        </div>
      )}

      <div className="bg-green-50 p-4 rounded-lg text-center">
        <div className="text-3xl font-bold text-green-600">{vagas}</div>
        <div className="text-sm text-green-700 font-medium">Total de Vagas</div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">Clique no mapa para fechar</p>
      </div>
    </div>
  );
};

const ContagemPopup = ({ props }: { props: any }) => {
  const ciclistas_por_min = props.ciclistas_por_min || 0;
  const realizador = props.realizador || "";
  const masculino = props.masculino || 0;
  const feminino = props.feminino || 0;
  const total = props.total || 0;
  const nome = props.nome || props.name || props.local || "Estação";

  return (
    <div className="p-4 min-w-64 max-w-80">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h3 className="font-bold text-gray-800 text-lg">{nome}</h3>
      </div>
      <div className="flex justify-between">
        {realizador && (
          <h4 className="font-semibold text-gray-800 text-md">
            Realizador: {realizador}
          </h4>
        )}
        <h4 className="font-semibold text-gray-800 text-md">
          Ciclistas por minuto: {ciclistas_por_min}
        </h4>
      </div>

      <div className="w-full gap-2 flex">
        <div className="bg-blue-50 p-4 rounded-lg text-center w-1/3">
          <div className="text-3xl font-bold text-blue-600">{masculino}</div>
          <div className="text-sm text-blue-700 font-medium">Masculino</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center w-1/3">
          <div className="text-3xl font-bold text-blue-600">{feminino}</div>
          <div className="text-sm text-blue-700 font-medium">Feminino</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center w-1/3">
          <div className="text-3xl font-bold text-blue-600">{total}</div>
          <div className="text-sm text-blue-700 font-medium">Total</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">Clique no mapa para fechar</p>
      </div>
    </div>
  );
};

export function MapView({
  malhaData,
  zonas30Data,
  bicicletarData,
  contagensData,
}: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  const [baseLayer, setBaseLayer] = useState<"raster" | "vector">("vector");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [panelExpanded, setPanelExpanded] = useState(true);

  const [layersVisibility, setLayersVisibility] = useState({
    ciclofaixa: true,
    ciclovia: true,
    ciclorrota: true,
    passeio: true,
    zonas30: true,
    bicicletar: true,
    contagem: true,
  });

  const tipologiaColors: Record<string, string> = {
    ciclofaixa: "#e63946",
    ciclovia: "#2a9d8f",
    ciclorrota: "#1d3557",
    passeio: "#11ff05",
  };

  const layerConfigs = [
    { key: "ciclofaixa", label: "Ciclofaixa", color: "#e63946" },
    { key: "ciclovia", label: "Ciclovia", color: "#2a9d8f" },
    { key: "ciclorrota", label: "Ciclorrota", color: "#1d3557" },
    {
      key: "passeio",
      label: "Passeio Compartilhado",
      color: "#11ff05",
    },
    {
      key: "zonas30",
      label: "Zonas 30",
      color: "#ffb703",
      isArea: true,
    },
    {
      key: "bicicletar",
      label: "Bicicletar",
      color: "#10b981",
      isPoint: true,
    },
    {
      key: "contagem",
      label: "Contagem",
      color: "#34A6F4",
    },
  ];

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
        [-38.65, -3.9],
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

      map.addSource("vias", { type: "geojson", data: malhaData });

      const tipologias = [
        {
          key: "ciclofaixa",
          label: "Ciclofaixa",
          color: tipologiaColors.ciclofaixa,
        },
        { key: "ciclovia", label: "Ciclovia", color: tipologiaColors.ciclovia },
        {
          key: "ciclorrota",
          label: "Ciclorrota",
          color: tipologiaColors.ciclorrota,
        },
        {
          key: "passeio",
          label: "Passeio Compartilhado",
          color: tipologiaColors.passeio,
        },
      ];

      tipologias.forEach(({ key, label, color }) => {
        map.addLayer({
          id: key,
          type: "line",
          source: "vias",
          paint: {
            "line-color": color,
            "line-width": ["interpolate", ["linear"], ["zoom"], 10, 2, 16, 5],
          },
          filter: ["==", ["get", "tipologia"], label],
        });
      });

      map.addSource("zonas30", { type: "geojson", data: zonas30Data });
      map.addLayer({
        id: "zonas30",
        type: "fill",
        source: "zonas30",
        paint: { "fill-color": "#ffb703", "fill-opacity": 0.3 },
      });

      map.addSource("bicicletar", { type: "geojson", data: bicicletarData });

      map.addLayer({
        id: "bicicletar-shadow",
        type: "circle",
        source: "bicicletar",
        paint: {
          "circle-color": "#10b981",
          "circle-opacity": 0.2,
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            [
              "interpolate",
              ["linear"],
              [
                "coalesce",
                ["get", "vagas_atuais"],
                ["get", "vagas"],
                ["get", "capacidade"],
                10,
              ],
              1,
              4,
              50,
              8,
            ],
            16,
            [
              "interpolate",
              ["linear"],
              [
                "coalesce",
                ["get", "vagas_atuais"],
                ["get", "vagas"],
                ["get", "capacidade"],
                10,
              ],
              1,
              8,
              50,
              14,
            ],
          ],
          "circle-stroke-width": 0,
        },
      });

      map.addLayer({
        id: "bicicletar",
        type: "circle",
        source: "bicicletar",
        paint: {
          "circle-color": [
            "interpolate",
            ["linear"],
            [
              "coalesce",
              ["get", "vagas_atuais"],
              ["get", "vagas"],
              ["get", "capacidade"],
              10,
            ],
            1,
            "#16a34a", // Verde escuro para poucas vagas
            20,
            "#22c55e", // Verde médio
            40,
            "#4ade80", // Verde claro para muitas vagas
          ],
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            [
              "interpolate",
              ["linear"],
              [
                "coalesce",
                ["get", "vagas_atuais"],
                ["get", "vagas"],
                ["get", "capacidade"],
                10,
              ],
              1,
              3, // mínimo 3px para 1 vaga
              50,
              6, // máximo 6px para 50+ vagas
            ],
            16,
            [
              "interpolate",
              ["linear"],
              [
                "coalesce",
                ["get", "vagas_atuais"],
                ["get", "vagas"],
                ["get", "capacidade"],
                10,
              ],
              1,
              6, // mínimo 6px para 1 vaga
              50,
              11, // máximo 11px para 50+ vagas
            ],
          ],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            0.75,
            16,
            1.25,
          ],
          "circle-opacity": 0.9,
        },
      });

      // Camada de ícone/número para mostrar quantidade de vagas
      map.addLayer({
        id: "bicicletar-label",
        type: "symbol",
        source: "bicicletar",
        layout: {
          "text-field": [
            "coalesce",
            ["get", "vagas_atuais"],
            ["get", "vagas"],
            ["get", "capacidade"],
            "?",
          ],
          "text-font": ["sans-serif"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 10, 8, 16, 10],
          "text-allow-overlap": true,
          "text-ignore-placement": true,
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#16a34a",
          "text-halo-width": 0.5,
        },
      });

      map.addSource("contagem", {
        type: "geojson",
        data: contagensData ?? { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: "contagem",
        type: "circle",
        source: "contagem",
        paint: { "circle-color": "#34A6F4" },
      });

      // Eventos de hover para as vias
      tipologias.forEach(({ key }) => {
        map.on("mouseover", key, () => {
          if (
            mapRef.current &&
            layersVisibility[key as keyof typeof layersVisibility]
          ) {
            mapRef.current.setPaintProperty(key, "line-width", [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              4,
              16,
              8,
            ]);
            mapRef.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.on("mouseout", key, () => {
          if (mapRef.current) {
            mapRef.current.setPaintProperty(key, "line-width", [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              2,
              16,
              5,
            ]);
            mapRef.current.getCanvas().style.cursor = "";
          }
        });
      });

      // Eventos de hover para pontos do Bicicletar
      map.on("mouseenter", "bicicletar", () => {
        if (mapRef.current && layersVisibility.bicicletar) {
          mapRef.current.setPaintProperty(
            "bicicletar-shadow",
            "circle-opacity",
            0.4
          );
          mapRef.current.setPaintProperty("bicicletar", "circle-stroke-width", [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            1.25,
            16,
            2,
          ]);
          mapRef.current.getCanvas().style.cursor = "pointer";
        }
      });

      map.on("mouseleave", "bicicletar", () => {
        if (mapRef.current) {
          mapRef.current.setPaintProperty(
            "bicicletar-shadow",
            "circle-opacity",
            0.2
          );
          mapRef.current.setPaintProperty("bicicletar", "circle-stroke-width", [
            "interpolate",
            ["linear"],
            ["zoom"],
            10,
            0.75,
            16,
            1.25,
          ]);
          mapRef.current.getCanvas().style.cursor = "";
        }
      });

      // Click events para as vias
      map.on(
        "click",
        ["ciclofaixa", "ciclovia", "ciclorrota", "passeio"],
        (e) => {
          if (!e.features) return;
          const props = e.features[0].properties;
          const popupNode = document.createElement("div");
          createRoot(popupNode).render(<MalhaPopup props={props} />);
          new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setDOMContent(popupNode)
            .addTo(map);
        }
      );

      // Click event para pontos do Bicicletar
      map.on("click", "bicicletar", (e) => {
        if (!e.features) return;
        const props = e.features[0].properties;
        const popupNode = document.createElement("div");
        createRoot(popupNode).render(<BicicletarPopup props={props} />);
        new maplibregl.Popup({
          closeOnClick: true,
          closeButton: true,
          maxWidth: "350px",
        })
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map);
      });

      map.on("click", "contagem", (e) => {
        if (!e.features) return;
        const props = e.features[0].properties;
        const popupNode = document.createElement("div");
        createRoot(popupNode).render(<ContagemPopup props={props} />);
        new maplibregl.Popup({
          closeOnClick: true,
          closeButton: true,
          maxWidth: "350px",
        })
          .setLngLat(e.lngLat)
          .setDOMContent(popupNode)
          .addTo(map);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, [malhaData, zonas30Data, bicicletarData]);

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

      // Para o Bicicletar, também controlar as camadas relacionadas
      if (layer === "bicicletar") {
        if (mapRef.current?.getLayer("bicicletar-shadow")) {
          mapRef.current.setLayoutProperty(
            "bicicletar-shadow",
            "visibility",
            visible ? "visible" : "none"
          );
        }
        if (mapRef.current?.getLayer("bicicletar-label")) {
          mapRef.current.setLayoutProperty(
            "bicicletar-label",
            "visibility",
            visible ? "visible" : "none"
          );
        }
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
                panelExpanded ? "rotate-180" : ""
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
