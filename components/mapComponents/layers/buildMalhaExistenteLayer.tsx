
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import maplibregl, { Map } from "maplibre-gl";
import { createRoot } from "react-dom/client";
import MalhaPopup from "../popUpsComponents/malhaPopup";

export function buildMalhaExistenteLayer(
  map: Map, 
  mapRef: any,
  malhaData: FeatureCollection<Geometry, GeoJsonProperties>
) {
  map.addSource("vias", { type: "geojson", data: malhaData });

  map.addLayer({
      id: "vias",
      type: "line",
      source: "vias",
      paint: {
        "line-color": "#000000",
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 2, 16, 5],
      },
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
}
