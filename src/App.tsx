import React, {useState} from 'react';
import './App.css';
import Map from './Components/Map';
import { MarkerData, toiletMarkers, trashMarkers, waterMarkers } from "./Components/Markers";
import SelectButton from './Components/SelectButton';


function App() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const showMarkers = (selected: string) => {
    if(selected === "toilet") {
      setMarkers(toiletMarkers);
    }
    else if (selected === "trash") {
      setMarkers(trashMarkers);
    }
    else if (selected === "water") {
      setMarkers(waterMarkers);
    }
  };

  return (
    <div id="content">
      <div id="map-container">
        <Map markers={markers}></Map>
      </div>
      <div id="button-overlay">
        <SelectButton showMarkers={showMarkers}/>
      </div>
    </div>
  );
}

export default App;
