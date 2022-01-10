import React,{useState,useEffect, useRef,useMemo} from 'react'
import { Marker, Popup, useMap, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// import { iconPerson } from './Icon';

function LocationMarker(props) {
  // {locationCoords,latestAqData}=props;
    const locationCoords=props.locationCoords;
    const latestAqData=props.latestAqData;
    // const [position, setPosition] = useState(null);
    const [latestAqDataMeasurements, setLatestAqDataMeasurements] = useState([]);
    const [noLatestAqData, setNoLatestAqData] = useState(true);
    const markerRef=useRef();
    const eventHandlers=useMemo(() => ({
      dragend(){
        // console.log(markerRef);
        const marker=markerRef.current;
        if(marker){
          // console.log(marker);
          let tempCoords=[];
          tempCoords.push(marker._latlng.lat.toFixed(7));
          tempCoords.push(marker._latlng.lng.toFixed(7));
          console.log(tempCoords);
          props.relocateLocationCoords(tempCoords);
        }
      }
    }), [props])
    const map=useMap();
    useEffect(() => {
      // eslint-disable-next-line
      if(latestAqData[0]) {
        setLatestAqDataMeasurements(latestAqData[0].measurements); 
        setNoLatestAqData(false);
      }
      else {
        setNoLatestAqData(true);
      }
      

    }, [latestAqData]);
    useEffect(() => {
      map.flyTo(locationCoords);
    }, [locationCoords,props,map])
  
    return noLatestAqData?(<Marker position={locationCoords} draggable ref={markerRef} eventHandlers={eventHandlers}>
          <Tooltip permanent>
            No reference grade sensors nearby
          </Tooltip>
      <Popup>
        Sorry, there are no Reference Grade sensors near you.
      </Popup>
    </Marker> ):(
        <Marker position={locationCoords} draggable ref={markerRef} eventHandlers={eventHandlers}>
          <Tooltip permanent>
            Click to see detailed AQ Data
          </Tooltip>
          <Popup>
            <div className='popup-main'>
              <div className='popup-heading'>
                <h3>Air near you</h3>
              </div>
              <div className='popup-body'>
                
                  {latestAqDataMeasurements?latestAqDataMeasurements.map((element)=>{
                    return <li className='popup-body-ele' key={element.parameter}>
                      {element.parameter} - {element.value} {element.unit}
                    </li>
                  }):null}
                
              </div>
            </div>
          </Popup>
        </Marker>
      )
}

export default LocationMarker
