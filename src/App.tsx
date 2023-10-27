import React, {useState} from 'react';
import './App.css';
import Map from './Components/Map';
import { MarkerData, toiletMarkers, trashMarkers, waterMarkers } from "./Components/Markers";
import SelectButton from './Components/SelectButton';
import './Font/Font.css'

function App() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [markerscliked,setMarkersclicked]=useState<boolean>(false);
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

  const change_MarkersClicked = () => {
    if(markerscliked===true){
      setMarkersclicked(false);
      setMarkers([]);
    }
    else{
      setMarkersclicked(true);
    }
    console.log(markerscliked);
  }
  return (
    <div id="content">
      {/* <SelectButton showMarkers={showMarkers} /> */}
      <div id="Title">Where is it</div>
      <div id="mapcontainer">
      <Map markers={markers}></Map>
      </div>
      <div id="button-overlay">
        <SelectButton showMarkers={showMarkers} change_MarkersClicked={change_MarkersClicked} clicked={markerscliked} />
      </div>
    </div>
  );
}

export default App;
