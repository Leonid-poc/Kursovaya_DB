import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Text2html from "./vendor/Text2html";
import "leaflet/dist/leaflet.css";

// eslint-disable-next-line react/prop-types
const Map = ({ mode }) => {
  const e = <Text2html mode={mode}/>;
  const center = [51.77629, 55.110047];
  return (
    <MapContainer center={center} zoom={16.77} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          Test
        </Popup>
      </Marker>
      {e}
    </MapContainer>
  );
};

export default Map;
