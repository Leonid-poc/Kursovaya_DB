import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline } from "react-leaflet";
import React, { useEffect } from 'react'
import "leaflet/dist/leaflet.css"

const Map = ({mode}) => {
	useEffect(() => {
		console.log(mode);
	}, [mode]);
  	const center = [51.77629, 55.110047];
  	return (
      <MapContainer center={center} zoom={16.77} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
}

export default Map