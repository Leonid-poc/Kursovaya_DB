import { useMapEvents } from "react-leaflet"
import ResBS from "./ResBS";

// eslint-disable-next-line react/prop-types
const DelBS = ({ coords, setCoords, mode }) => {
    useMapEvents({
        click() {
            alert("Нажмите именно на маркер")
        }
    });
  return (
    <ResBS coords={coords} setCoords={setCoords} mode={mode}/>
  )
}

export default DelBS