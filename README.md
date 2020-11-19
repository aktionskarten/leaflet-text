# Leaflet-Text

This plugin adds support for static texts in Leaflet maps. If you want text that
does not resize on zoom in or out animation but has a fixed size, you may be
interested in this plugin. You need to provide a bounding box where you want to
place your text. Technically rendering is done through embedded texts in a SVG
element, which is then used through `L.SVGOverlay`.

## Demo

See the following examples for demonstration:

* https://aktionskarten.github.io/leaflet-text/simple.html
* https://aktionskarten.github.io/leaflet-text/geojson.html


## Install

```
$ npm install leaflet-text
```


## Quickstart

```javascript
import {svgLabelledTextBox} from 'leaflet-text-editable'

const map = L.map('map').setView([52.5069,13.4298], 15);

//...

map.whenReady(function() {
  const label = 'Headline'
  const text = '12:00 | Alexanderplatz\n„Alle gegen Alle“'
  const bounds = L.latLngBounds([52.50998775888057,13.444347381591799],[52.50611297738362,13.427524566650392]);
  svgLabelledTextBox(bounds, label, text).addTo(map)
});
```
