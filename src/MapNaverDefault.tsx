import { useEffect, useRef } from 'react';
import Service from './Service';
const MapNaverDefault = () => {
  useEffect(() => {
    const mapDiv = document.getElementById("map");
    const map = new window.naver.maps.Map(mapDiv);
  }, []);

  return (
    <div>
    <Service/>
      <div id="map" style={{ width: "400px", height: "400px" }}></div> 
    </div>
    
  );
};
// difference
export default MapNaverDefault;