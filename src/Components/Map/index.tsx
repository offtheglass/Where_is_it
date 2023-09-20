import React from 'react';
import { MarkerData } from '../Markers';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  markers: MarkerData[];
}

const Map: React.FC<MapProps> = ({ markers }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: "400px", width: "100%"}}>
      <TileLayer
        url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker , index)=> (
        <Marker
          key = {index}
          position = {[marker.latitude, marker.longitude]}
        >
          <Popup>
            <p> {marker.description} </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
