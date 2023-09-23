import React from 'react';
import { MarkerData } from '../Markers';
import { Container as MapDiv, NaverMap, Marker, useNavermaps } from 'react-naver-maps';

interface MapProps {
  markers: MarkerData[];
}

const navermaps = useNavermaps();

const Map: React.FC<MapProps> = ({ markers }) => {
  return (
    <MapDiv 
      style={{margin: '30px auto', width: '90%', height: '500px'}}
    >
      <NaverMap 
        defaultCenter = {new navermaps.LatLng(37.5619, 126.9363)}
        defaultZoom = {18}
      >
        {markers.map((marker)=> (
          <Marker
            key ={marker.id}
            position = {new navermaps.LatLng(marker.latitude, marker.longitude)}
          />
        ))}
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
