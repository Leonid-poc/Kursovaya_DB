import AddBS from "../components/BS/AddBS";
import ApplyEdit from "../components/Edit/ApplyEdit";
import CancelEdit from "../components/Edit/CancelEdit";
import DelConn from "../components/DelConn/DelConn";
import Edit from "../components/Edit/Edit";
import NextEdit from "../components/Edit/NextEdit";
import ApplyBS from "../components/BS/ApplyBS";
import CancelBS from "../components/BS/CancelBS";
import ApplyDel from "../components/DelConn/ApplyDel";

import PropTypes from 'prop-types'
import { useState } from "react";
import DelBS from "../components/BS/DelBS";

// eslint-disable-next-line react/prop-types
const Text2html = ({mode, setGlobalCoordsBS, globalCoordsBS, setGlobalLines}) => {
  const [coordsBS, setCoordsBS] = useState([]);
  switch (mode) {
    case "AddBS": return <AddBS coords={coordsBS} setCoords={setCoordsBS} mode={mode}/>
    case "ApplyBS": return <ApplyBS coords={coordsBS} globalCoordsBS={globalCoordsBS} setCoords={setCoordsBS} mode={mode} setGlobalCoordsBS={setGlobalCoordsBS}/>
    case "CancelBS": return <CancelBS coords={coordsBS} setCoords={setCoordsBS} mode={mode}/>
    case "DelBS": return <DelBS coords={coordsBS} setCoords={setCoordsBS} mode={mode}/>

    case "ApplyEdit": return <ApplyEdit/>
    case "CancelEdit": return <CancelEdit/>
    case "Edit": return <Edit/>
    case "NextEdit": return <NextEdit/>

    case "DelConn": return <DelConn/>
    case "ApplyDel": return <ApplyDel/>
  }
  return <></>
}
Text2html.propTypes = {
  mode: PropTypes.string
}

export default Text2html