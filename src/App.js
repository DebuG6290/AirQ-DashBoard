// import logo from './logo.svg';
import './App.css';
import { useState ,useEffect} from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// import LocationMarker from './components/Map/LocationMarker';
import Map from './components/Map/Map';
// import Api from './components/Api/Api';
import AnalysisBody from './components/Analysis Body/AnalysisBody';
import Navbar from './components/Navbar';

function App() {
  const [userCoords, setUserCoords] = useState(null);
  const [cityCoords, setCityCoords] = useState([28.7256504,77.2011573]);
  const [locationCoords, setLocationCoords] = useState([28.7256504,77.2011573]);
  const [latestAqData, setLatestAqData] = useState({});
  const parameters=['pm10','pm25','o3','no2','co','co2','so2'];
  const [paramData, setParamData] = useState({});
  useEffect(() => {
    setLocationCoords(userCoords?userCoords:cityCoords);
  }, [userCoords,cityCoords]);
  useEffect(() => {
        async function fetchData(){
          const resp= await fetch(`https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?limit=100&page=1&offset=0&sort=desc&coordinates=${locationCoords[0]}%2C${locationCoords[1]}&radius=10000&order_by=location&sensorType=reference%20grade&dumpRaw=false`);
          const jsonresp=await resp.json();
          setLatestAqData(jsonresp.results);
          let dateApi=new Date();
          let year=dateApi.getUTCFullYear();
          let month=dateApi.getUTCMonth();
          month+=1;
          if(month.toString().length===1){
            month='0'+month.toString();
          }
          let date=dateApi.getUTCDate();
          if(date.toString().length===1){
            date='0'+date.toString();
          }
          let hours=dateApi.getUTCHours();
          let minutes=dateApi.getUTCMinutes();
          let seconds=dateApi.getUTCSeconds();
          // console.log(month, hours,minutes,seconds);
          let tempParamData=[];
          for (let index = 0; index < parameters.length; index++) {
            let presp=await fetch(`https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=${year}-${month}-${date}T${hours}%3A${minutes}%3A${seconds}%2B00%3A00&limit=24&page=1&offset=0&sort=desc&parameter=${parameters[index]}&coordinates=${locationCoords[0]}%2C${locationCoords[1]}&radius=10000&order_by=datetime&sensorType=reference%20grade`);
            let tempDt=await presp.json();
            tempDt=tempDt.results;
            console.log(tempDt);
            // let param=parameters[index];
            tempParamData.push(tempDt);
          }
            console.log(tempParamData);
            setParamData(tempParamData);
            setCityCoords([28.7256504,77.2011573])
        }
        fetchData();
          // console.log(paramData);
          // eslint-disable-next-line
    }, [locationCoords])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e)=>{console.log(e);
      let tempArr=[];
      tempArr.push(e.coords.latitude);
      tempArr.push(e.coords.longitude);
      setUserCoords(tempArr);
    });
  }, []);
  let relocateLocationCoords=(newCoords)=>{
    console.log(newCoords);
    console.log('gg op',newCoords);
    if(newCoords&&newCoords!==undefined)setLocationCoords(newCoords);
  }
  return (
    <div className="App">
      {/* <Api locationCoords={locationCoords}/> */}
      <Navbar locationCoords={locationCoords}/>
      <Map locationCoords={locationCoords} latestAqData={latestAqData} relocateLocationCoords={relocateLocationCoords}/>
      <AnalysisBody locationCoords={locationCoords} latestAqData={latestAqData} parameters={parameters} paramData={paramData}/>
    </div>
  );
}

export default App;
