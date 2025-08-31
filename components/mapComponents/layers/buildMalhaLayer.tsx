
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import maplibregl, { Map } from "maplibre-gl";
import { createRoot } from "react-dom/client";
import MalhaPopup from "../popUpsComponents/malhaPopup";

export function buildMalhaLayer(
  map: Map, 
  mapRef: any,
  malhaData: FeatureCollection<Geometry, GeoJsonProperties>
) {
  map.addSource("vias", { type: "geojson", data: malhaData });

  const tipologias = [
    {
      key: "ciclofaixa",
      label: "Ciclofaixa",
      color: "#34A6F4",
    },
    {
      key: "ciclofaixa unidirecional",
      label: "Ciclofaixa",
      color: "#34A6F4",
    },
    {
      key: "ciclofaixa bidirecional",
      label: "Ciclofaixa bidirecional",
      color: "#34A6F4",
    },
    { key: "ciclovia", label: "Ciclovia", color: "#e63946" },
    {
      key: "ciclovia bidirecional",
      label: "Ciclovia bidirecional",
      color: "#e63946"
    },
    {
      key: "ciclorrota",
      label: "Ciclorrota",
      color: "#E07816",
    },
    {
      key: "passeio",
      label: "Passeio Compartilhado",
      color: "#10B02E",
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

  // map.on("mouseenter", "vias", (e) => {
    // map.getCanvas().style.cursor = "pointer";

  //   if (!e.features) return ;
  //   const feature = e.features[0];

  //   map.addLayer({
  //       id: "highlighted-via",
  //       type: "line",
  //       source: "vias",
  //       paint: {
  //         "line-color": [
  //           "match",
  //           ["get", "tipologia"],
  //           "ciclofaixa", "#ff0000",
  //           "ciclovia", "#00ff00", 
  //           "ciclorrota", "#0000ff", 
  //           "passeio", "#ffff00", 
  //           "#888888" 
  //         ],
  //         "line-width": 6,        
  //       },
  //       filter: [
  //         "==", ["get", "id"], feature.properties.id,
  //       ],
  //     });
  // });

  // map.on("mouseleave", "vias", () => {
    // map.getCanvas().style.cursor = "";
  //   if (map.getLayer("highlighted-via")) {
  //     map.removeLayer("highlighted-via");
  //   }
  // });

  tipologias.forEach(({ key }) => {
    map.on("mouseover", key, () => {
      if (
        mapRef.current
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
}
