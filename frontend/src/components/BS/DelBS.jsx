import { useMapEvents } from "react-leaflet"
import ResBS from "./ResBS";

// eslint-disable-next-line react/prop-types
const DelBS = ({ coords, setCoords }) => {
    useMapEvents({
        click(e) {
            console.log(e.target);
        }
    });
  return (
    <ResBS coords={coords}/>
  )
}

export default DelBS