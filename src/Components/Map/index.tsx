import React, { useEffect, useState } from 'react';
import { MarkerData } from '../Markers';
import MiniView from '../MiniViews';
import { Container as MapDiv, NaverMap, Marker, InfoWindow, useNavermaps, useMap } from 'react-naver-maps';

interface MapProps {
  markers: MarkerData[];
}

const navermaps = useNavermaps();
const map = useMap();

const Map: React.FC<MapProps> = ({ markers }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  }
  return (
    <MapDiv 
      style={{
        margin: '30px auto', 
        width: '90%', 
        height: '500px'}}
    >
      <NaverMap
        defaultCenter = {new navermaps.LatLng(37.5619, 126.9363)}
        defaultZoom = {18}
      >
        {markers.map((marker)=> 
          <Marker
            key ={marker.id}
            position = {new navermaps.LatLng(marker.latitude, marker.longitude)}
            onClick = {() => handleMarkerClick(marker)}
          />
        )}
        {/* {selectedMarker && (<InfoWindow 
          position = {new navermaps.LatLng(selectedMarker.latitude, selectedMarker.longitude)}
          content = {'<div class="infowindow_container">{selectedMarker.description}</div>'}
        />
        )} */}
        {selectedMarker && (<MiniView 
          description = {selectedMarker.description}
        />
        )}
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
