import { useEffect } from "react";
import ResBS from "./ResBS";

// eslint-disable-next-line react/prop-types
const CancelBS = ({ coords, setCoords }) => {
  useEffect(() => {
    setCoords([]);
  }, [setCoords]);
  return (
    <ResBS coords={coords}/>
  )
}

export default CancelBS