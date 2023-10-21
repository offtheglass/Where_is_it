import React, {useState} from 'react';
import './App.css';
import Map from './Components/Map';
import { MarkerData, toiletMarkers, trashMarkers, waterMarkers, safeMarkers, miscMarkers } from "./Components/Markers";
import SelectButton from './Components/SelectButton';


function App() {
  const [markerDataList, setMarkers] = useState<MarkerData[]>([]);

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
    else if (selected === "safe") {
      setMarkers(safeMarkers);
    }
    else if (selected === "misc") {
      setMarkers(miscMarkers);
    }
  };

  return (
    <div id="content">
      <div id="map-container">
        <Map markerDataList={markerDataList}></Map>
      </div>
      <div id="button-overlay">
        <SelectButton showMarkers={showMarkers}/>
      </div>
    </div>
  );
}

export default App;
