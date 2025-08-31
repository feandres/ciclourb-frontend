
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { Map } from "maplibre-gl";

export function buildZonas30Layer(
  map: Map, 
  zonas30Data: FeatureCollection<Geometry, GeoJsonProperties>
) {
  map.addSource("zonas30", { type: "geojson", data: zonas30Data });
  map.addLayer({
    id: "zonas30",
    type: "fill",
    source: "zonas30",
    paint: { "fill-color": "#ffb703", "fill-opacity": 0.3 },
  });
}
