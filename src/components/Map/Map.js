import React from 'react'
import LocationMarker from './LocationMarker'
import { MapContainer, TileLayer } from 'react-leaflet'
import './Map.css'

function Map(props) {
    const locationCoords=props.locationCoords;
    const latestAqData=props.latestAqData;
function relocateLocationCoords(tempCoords){
    console.log('hello',tempCoords);
    props.relocateLocationCoords(tempCoords);
}
    return (
        <div className='map-container-div'>
            <MapContainer center={locationCoords} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker locationCoords={locationCoords} latestAqData={latestAqData} relocateLocationCoords={relocateLocationCoords}/>
            </MapContainer>
        </div>
    )
}

export default Map
