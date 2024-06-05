import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ResBS = ({ coords, setCoords, mode }) => {
    // console.log(coords);
  const handleMarker = (el) => {
    if (mode == "DelBS") {
      // setCoords(coords.filter(elem => elem != el));
      setCoords(coords.map(elem => {
        if (elem == el) return {...elem, status: "del"}
        return elem;
      }))
    }
  }

  return <>
    {coords.map((el, i) => (
    <Marker position={[el.lat, el.lng]} key={i} eventHandlers={{click: () => {handleMarker(el);}}}>
        <Popup>{el.desc}</Popup>
    </Marker>
    ))}
  </>
}

ResBS.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      desc: PropTypes.string,
      color: PropTypes.string
    }))
  }

export default ResBS