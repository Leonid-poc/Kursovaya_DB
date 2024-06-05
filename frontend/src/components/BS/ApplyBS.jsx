import { useEffect, useState } from "react";
import ResBS from "./ResBS"
import { updBS } from "../../vendor/data";

// eslint-disable-next-line react/prop-types
const ApplyBS = ({coords, setCoords, setGlobalCoordsBS, globalCoordsBS}) => {
  const [trueS, setTrueS] = useState(false);
  // setGlobalCoordsBS((prev) => [...prev, coords]);
  useEffect(() => {
    setGlobalCoordsBS(prev => [...new Set([...prev, ...coords])]);
    setCoords([]);
    setTrueS(true);
  }, [setCoords]);
  
  if (trueS) {
    updBS(globalCoordsBS);
    setTrueS(false);
  }
  useEffect(() => {
  }, [globalCoordsBS]);
  return (
    <ResBS coords={coords}/>
  )
}

export default ApplyBS;