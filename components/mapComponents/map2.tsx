'use client'
import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  malhaData: any;
}

export default function MapComponent({ malhaData }: Props) {
  
  const mapContainer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {

    if (!mapContainer.current) return;

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

    map.on("load", () => {
      map.addSource("raster-tiles", {
        type: "raster",
        tiles: [
          "https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",
        ],
        tileSize: 256,
      });

      map.addLayer({
        id: "raster-layer",
        type: "raster",
        source: "raster-tiles",
        layout: { visibility: "visible"}
        // layout: { visibility: baseLayer === "raster" ? "visible" : "none" },
      });
      
      malhaData?.forEach((malha: any) => {
        map.addSource("geom_data" + malha.id, { type: "geojson", data: malha.geom });
        
        map.addLayer({
          id: malha.id,
          type: "line",
          source: "geom_data" + malha.id,
          paint: {
            "line-color": "#000000",
            "line-width": ["interpolate", ["linear"], ["zoom"], 10, 2, 16, 5],
          },
        });
      });
    });

  }, []);

  return (
    <div className="w-full h-screen">
      <div ref={mapContainer} className='w-full min-h-full mx-auto rounded-md'></div>
    </div>
  )
}

