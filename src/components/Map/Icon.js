import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('./air-quality-marker.png'),
    iconRetinaUrl: require('./air-quality-marker.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 40),
    className: 'leaflet-div-icon'
});

export { iconPerson };
