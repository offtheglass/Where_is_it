import React, {useState} from 'react';
import './App.css';
import Map from './Components/Map';
import { MarkerData, toiletMarkers, trashMarkers, waterMarkers, safeMarkers, miscMarkers } from "./Components/Markers";
import SelectButton from './Components/SelectButton';
import './Font/Font.css'

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
    } else {
      setMarkers([]);
    }
  };

  return (
    <div id="content">
      {/* <SelectButton showMarkers={showMarkers} /> */}
      <div id="title">Where is it ?</div>
      <div id="button-overlay">
        <SelectButton showMarkers={showMarkers}/>
      </div>
      <div id="mapcontainer">
      <Map markers={markerDataList}></Map>
      </div>
    </div>
  );
}

export default App;
