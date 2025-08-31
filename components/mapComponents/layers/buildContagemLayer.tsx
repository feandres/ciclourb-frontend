
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import maplibregl, { Map } from "maplibre-gl";
import { createRoot } from "react-dom/client";
import ContagemPopup from "../popUpsComponents/contagemPopup";

export function buildContagemLayer(
  map: Map, 
  mapRef: any,
  contagensData: FeatureCollection<Geometry, GeoJsonProperties>
) {
  map.addSource("contagem", {
    type: "geojson",
    data: contagensData ?? { type: "FeatureCollection", features: [] },
  });

  map.addLayer({
    id: "contagem",
    type: "circle",
    source: "contagem",
    paint: { "circle-color": "#2a9d8f" },
  });

  map.on("mouseenter", "contagem", () => {
    mapRef.current.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "contagem", () => {
    mapRef.current.getCanvas().style.cursor = "";
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
}
