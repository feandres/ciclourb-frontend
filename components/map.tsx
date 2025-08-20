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
}

export function MapView({ malhaData, zonas30Data, bicicletarData }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [baseLayer, setBaseLayer] = useState<"raster" | "vector">("vector");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: { version: 8, sources: {}, layers: [] },
      center: [-38.5263, -3.7418],
      zoom: 13,
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
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
      });
      map.addLayer({
        id: "vector-layer",
        type: "raster",
        source: "vector-tiles",
        layout: { visibility: baseLayer === "vector" ? "visible" : "none" },
      });

      map.addSource("vias", {
        type: "geojson",
        data: malhaData,
      });

      map.addLayer({
        id: "vias",
        type: "line",
        source: "vias",
        paint: {
          "line-color": [
            "match",
            ["get", "tipologia"],
            "Ciclofaixa", "#ff0000",
            "Ciclovia", "#00ff00", 
            "Ciclorrota", "#0000ff", 
            "Passeio compartilhado", "#ffff00", 
            "#888888" 
          ],
          "line-width": 3,
        },
      });

      map.addSource('zonas30', {
        type: 'geojson',
        data: zonas30Data
      });

      map.addLayer({
        id: 'zonas30',
        type: 'fill',
        source: 'zonas30',
        layout: {},
        paint: {
          'fill-color': '#00ffff',
        },
      });

      map.addSource('bicicletar', {
        type: 'geojson',
        data: bicicletarData
      });

      map.addLayer({
        id: 'bicicletar',
        type: 'circle',
        source: 'bicicletar',
        paint: {
          'circle-color': '#F54927',
          'circle-radius': 4,
        },
      });
    });

    map.on("mouseenter", "vias", (e) => {
      map.getCanvas().style.cursor = "pointer";

      if (!e.features) return ;
      const feature = e.features[0];

      map.addLayer({
          id: "highlighted-via",
          type: "line",
          source: "vias",
          paint: {
            "line-color": [
              "match",
              ["get", "tipologia"],
              "Ciclofaixa", "#ff0000",
              "Ciclovia", "#00ff00", 
              "Ciclorrota", "#0000ff", 
              "Passeio compartilhado", "#ffff00", 
              "#888888" 
            ],
            "line-width": 6,        
          },
          filter: [
            "==", ["get", "id"], feature.properties.id,
          ],
        });
    });

    map.on("mouseleave", "vias", () => {
      map.getCanvas().style.cursor = "";
      if (map.getLayer("highlighted-via")) {
        map.removeLayer("highlighted-via");
      }
    });

    map.on("click", "vias", (e) => {
      if (!e.features) return;

      const props = e.features[0].properties;

      const popupNode = document.createElement("div");
      const root = createRoot(popupNode);
      root.render(<MalhaPopup props={props}/>)

      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setDOMContent(popupNode)
        .addTo(map);

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

    if (mapRef.current.getLayer("vias")) {
      mapRef.current.setLayoutProperty(
        "vias",
        "visibility",
        visible ? "visible" : "none"
      );
    }
  }, [visible, mapLoaded]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="h-full w-full" />

      <div className="absolute top-25 left-4 z-10 bg-white rounded-lg shadow p-3 space-y-2">
        <button
          onClick={() =>
            setBaseLayer((prev) => (prev === "raster" ? "vector" : "raster"))
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {baseLayer === "raster" ? "Vetorial" : "Satélite"}
        </button>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible((prev) => !prev)}
          />
          <span className="inline-block w-5 h-3 rounded bg-red-500" />
          <span className="text-sm">Vias</span>
        </label>
      </div>

      <div className="absolute bottom-2 left-2 z-10 bg-white/80 rounded-lg shadow p-3">
        <h1 className="text-xl font-bold">Legenda</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible((prev) => !prev)}
          />
          <span className="inline-block w-5 h-3 rounded bg-red-500" />
          <span className="text-sm">Ciclofaixa</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible((prev) => !prev)}
          />

          <span className="inline-block w-5 h-3 rounded bg-green-500" />
          <span className="text-sm">Ciclovia</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible((prev) => !prev)}
          />

          <span className="inline-block w-5 h-3 rounded bg-blue-500" />
          <span className="text-sm">Ciclorrota</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible((prev) => !prev)}
          />

          <span className="inline-block w-5 h-3 rounded bg-yellow-500" />
          <span className="text-sm">Passeio compartilhado</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible((prev) => !prev)}
          />

          <span className="inline-block w-5 h-3 rounded bg-yellow-500" />
          <span className="text-sm">Zonas 30</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={visible}
            onChange={() => setVisible((prev) => !prev)}
          />

          <span className="inline-block w-5 h-3 rounded bg-yellow-500" />
          <span className="text-sm">Pontos do bicicletar</span>
        </label>
      </div>
    </div>
  );
}
