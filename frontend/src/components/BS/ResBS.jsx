import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";

const ResBS = ({ coords }) => {
    console.log(coords);
  return <>
    {coords.map((el, i) => (
    <Marker position={[el.lat, el.lng]} key={i}>
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