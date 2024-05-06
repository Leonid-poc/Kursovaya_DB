import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React from 'react'
import "leaflet/dist/leaflet.css"

const Map = () => {
    const coords = [51.77629, 55.110047];
  return (
    <MapContainer center={coords} zoom={16.77} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
  )
}

export default Map