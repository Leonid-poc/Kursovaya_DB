import { useMapEvents } from "react-leaflet"
import PropTypes from 'prop-types'
import ResBS from "./ResBS";
import { useEffect } from "react";


// eslint-disable-next-line react/prop-types
const AddBS = ({ coords, setCoords }) => {
  useEffect(() => {
    alert("Учтите что при удалении точки, которая уже стояла на карте, восстановить ее не получится")
  }, [setCoords])
  
  let r = "";
  useMapEvents({
    click(e) {
      r = prompt("Введите название остановки")
      console.log(e.latlng.lat, e.latlng.lng);
      setCoords(prev => [...prev, {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        desc: r,
        color: "blue",
        status: "new"
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