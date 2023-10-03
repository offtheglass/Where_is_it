import React,{useEffect}from 'react';
import { MarkerData } from '../Markers';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

// interface MapProps {
//   markers: MarkerData[];
// }

// const Map: React.FC<MapProps> = ({ markers }) => {
//   const navermaps = useNavermaps();
  
//   useEffect(
//   () => {
//   var engineeringHallPolygon = new navermaps.Polygon({
//     paths: [[
//       new navermaps.LatLng(37.5645, 126.9380),
//       new navermaps.LatLng(37.5645, 126.9390),
//       new navermaps.LatLng(37.5650, 126.9390),
//       new navermaps.LatLng(37.5650, 126.9380)
//     ]],
//     strokeColor: 'red',
//     strokeOpacity: 0.7,
//     strokeWeight: 2,
//     fillColor: '#FF0000',
//     fillOpacity: 0.3
//   });

//   navermaps.Event.addListener(engineeringHallPolygon, "click", function () {
//     alert('engineeringHallPolygon click');
//   });
  
// },[]);
//   return (
//     <MapDiv 
//       style={{margin: '30px auto', width: '90%', height: '500px'}}
//     >
//       <NaverMap 
//         defaultCenter = {new navermaps.LatLng(37.5619, 126.9363)}
//         defaultZoom = {18}
//       >
//         {markers.map((marker)=> (
//           <Marker
//             key ={marker.id}
//             position = {new navermaps.LatLng(marker.latitude, marker.longitude)}
//           />
//         ))}
//       </NaverMap>
//     </MapDiv>
//   );
// };

// export default Map;
const Map = () => {
  const navermaps = useNavermaps();

  useEffect(() => {
    const mapDiv = document.getElementById('map');
    const mapOptions = {
      center: new navermaps.LatLng(37.5619, 126.9363), // Adjust the center as needed
      zoom: 15, // Adjust the zoom level as needed
    };
    const map = new navermaps.Map(mapDiv, mapOptions);

    // Define polygon coordinates
    const engineeringHallCoords = [
      new navermaps.LatLng(37.5645, 126.9380),
      new navermaps.LatLng(37.5645, 126.9390),
      new navermaps.LatLng(37.5650, 126.9390),
      new navermaps.LatLng(37.5650, 126.9380),
    ];

    // Create the polygon
    const engineeringHallPolygon = new navermaps.Polygon({
      map: map,
      paths: engineeringHallCoords,
      strokeColor: 'red', // Set the stroke color to red
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.3,
      clickable: true
    });
    navermaps.Event.addListener(engineeringHallPolygon, "click", function () {
      alert('engineeringHallPolygon click');
    });
  }, []);

  

  return (
    <div id="map" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default Map