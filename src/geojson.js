import L from 'leaflet';
import { SVGText } from './text';

const ExtendedGeoJSON = L.GeoJSON.extend({
  addData(geojson) {
    const features = Array.isArray(geojson) ? geojson : geojson.features;
    if (features) {
      return L.GeoJSON.prototype.addData.call(this, geojson);
    }

    const layer = this.createLayer(geojson);
    if (!layer) {
      return this;
    }

    return this.addLayer(layer);
  },

  /* eslint-disable new-cap */
  createLayer(geojson) {
    const { options } = this;
    if (options.filter && !options.filter(geojson)) {
      return this;
    }

    let layer = L.GeoJSON.geometryToLayer(geojson, options);
    if (!layer) {
      return null;
    }

    if (geojson.properties && (geojson.properties.label || geojson.properties.text)) {
      const klass = this.options.textClass || SVGText;
      const text = new klass(layer.getBounds());
      text.setLabel(geojson.properties.label || '');
      text.setText(geojson.properties.text || '');
      layer = text;
    }

    layer.feature = L.GeoJSON.asFeature(geojson);

    layer.defaultOptions = layer.options;
    this.resetStyle(layer);

    if (options.onEachFeature) {
      options.onEachFeature(geojson, layer);
    }

    return layer;
  },
});

const extendedGeoJSON = (geojson, options) => new ExtendedGeoJSON(geojson, options);

export { extendedGeoJSON, ExtendedGeoJSON };
