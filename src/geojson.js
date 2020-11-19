import L from 'leaflet'
import {svgText} from './text'

const ExtendedGeoJSON = L.GeoJSON.extend({
  addData(geojson) {
    if (!geojson.properties || !(geojson.properties.label || geojson.properties.text)) {
      return L.GeoJSON.prototype.addData.call(this, geojson);
    }

    const options = this.options; 
    if (options.filter && !options.filter(geojson)) {
      return this;
    }

    const layer = L.GeoJSON.geometryToLayer(geojson, options);
    if (!layer) {
      return this;
    }

    const text = svgText(layer.getBounds());
    text.setLabel(geojson.properties.label || "");
    text.setText(geojson.properties.text || "");
    text.feature = L.GeoJSON.asFeature(geojson);

    text.defaultOptions = layer.options;
    this.resetStyle(text);

    if (options.onEachFeature) {
      options.onEachFeature(geojson, text);
    }

    return this.addLayer(text);
  }
});

const extendedGeoJSON = (geojson, options) => new ExtendedGeoJSON(geojson, options)

export {extendedGeoJSON, ExtendedGeoJSON}
