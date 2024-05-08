import { useMapEvents } from "react-leaflet"
import PropTypes from 'prop-types'
import ResBS from "./ResBS";


// eslint-disable-next-line react/prop-types
const AddBS = ({ coords, setCoords }) => {
  let r = "";
  useMapEvents({
    click(e) {
      r = prompt("Введите название остановки")
      setCoords(prev => [...prev, {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        desc: r,
        color: "blue"
      }])
    }
  });
  return <ResBS coords={coords}/>
}
AddBS.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    desc: PropTypes.string,
    color: PropTypes.string
  }))
}

export default AddBS