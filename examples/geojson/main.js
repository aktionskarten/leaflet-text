import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {extendedGeoJSON} from '@/index.js'
import data from './data'

const map = L.map('map');

map.setView([52.5069,13.4298], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  detectRetina: true,
  attribution: 'Tiles &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> '
}).addTo(map);

extendedGeoJSON(data).addTo(map);
