import React, {useState} from 'react';
import './App.css';
import Map from './Components/Map';
import { MarkerData, toiletMarkers, trashMarkers, waterMarkers, printerMarkers } from "./Components/Markers"
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
    else if (selected === "printer") {
      setMarkers(printerMarkers);
    }
  };
  return (
    <div id="content">
      <SelectButton showMarkers={showMarkers} />
      <Map markers = {markers} />
    </div>
  );
}
export default App;