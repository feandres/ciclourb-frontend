
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import maplibregl, { Map } from "maplibre-gl";
import { createRoot } from "react-dom/client";
import BicicletarPopup from "../popUpsComponents/bicicletarPopup";

export function buildBicicletarLayer(
  map: Map, 
  mapRef: any,
  bicicletarData: FeatureCollection<Geometry, GeoJsonProperties>
) {
  map.addSource("bicicletar", { type: "geojson", data: bicicletarData });
          
  map.addLayer({
    id: "bicicletar",
    type: "circle",
    source: "bicicletar",
    paint: { "circle-color": "#10b981" },
  });

  map.on("mouseenter", "bicicletar", () => {
    mapRef.current.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "bicicletar", () => {
    mapRef.current.getCanvas().style.cursor = "";
  });

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
}
