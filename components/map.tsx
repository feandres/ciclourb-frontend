"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map } from "maplibre-gl";
import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  geojsonData: FeatureCollection<Geometry, GeoJsonProperties>;
}

export function MapView({ geojsonData }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [baseLayer, setBaseLayer] = useState<"raster" | "vector">("raster");
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
        data: geojsonData,
      });

      map.addLayer({
        id: "vias",
        type: "line",
        source: "vias",
        paint: {
          "line-color": "#ff0000",
          "line-width": 3,
        },
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
    </div>
  );
}
