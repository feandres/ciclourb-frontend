"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  geojsonData: Record<string, any>;
}

export function MapView({ geojsonData }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [baseLayer, setBaseLayer] = useState<"raster" | "vector">("raster");
  const [mapLoaded, setMapLoaded] = useState(false);

  const layerColors: Record<string, string> = {
    CONTIDO_GEOJSON: "#1f77b4",
    EXECUTADO_GEOJSON: "#2ca02c",
    EXISTENTE_GEOJSON: "#ff7f0e",
    NAOCONTIDO_GEOJSON: "#d62728",
    NAOEXECUTADO_GEOJSON: "#9467bd",
  };

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [],
      },
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

      Object.entries(geojsonData).forEach(([key, data]) => {
        map.addSource(key, { type: "geojson", data });

        map.addLayer({
          id: key,
          type: "line",
          source: key,
          paint: {
            "line-color": layerColors[key] || "#000",
            "line-width": 3,
          },
        });
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
      setMapLoaded(false);
    };
  }, [geojsonData]);

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

  const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>(
    () => {
      const allVisible: Record<string, boolean> = {};
      Object.keys(geojsonData).forEach((key) => (allVisible[key] = true));
      return allVisible;
    }
  );

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    Object.entries(visibleLayers).forEach(([layerId, isVisible]) => {
      if (mapRef.current!.getLayer(layerId)) {
        mapRef.current!.setLayoutProperty(
          layerId,
          "visibility",
          isVisible ? "visible" : "none"
        );
      }
    });
  }, [visibleLayers, mapLoaded]);

  function toggleLayer(layerId: string) {
    setVisibleLayers((prev) => ({
      ...prev,
      [layerId]: !prev[layerId],
    }));
  }

  return (
    <div className="relative w-full h-[calc(100vh-8rem)]">
      <div ref={mapContainer} className="h-full w-full" />

      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow p-3 space-y-2">
        <button
          onClick={() =>
            setBaseLayer((prev) => (prev === "raster" ? "vector" : "raster"))
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {baseLayer === "raster" ? "Vetorial" : "Satélite"}
        </button>

        <div>
          {Object.entries(layerColors).map(([layerId, color]) => (
            <label key={layerId} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={visibleLayers[layerId]}
                onChange={() => toggleLayer(layerId)}
              />
              <span
                className="inline-block w-5 h-3 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{layerId}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
