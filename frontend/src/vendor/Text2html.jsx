import AddBS from "../components/BS/AddBS";
import ApplyEdit from "../components/Edit/ApplyEdit";
import CancelEdit from "../components/Edit/CancelEdit";
import DelConn from "../components/DelConn/DelConn";
import Edit from "../components/Edit/Edit";
import NextEdit from "../components/Edit/NextEdit";
import ApplyBS from "../components/BS/ApplyBS";
import CancelBS from "../components/BS/CancelBS";
import ApplyDel from "../components/DelConn/ApplyDel";
import CancelDelConn from "../components/DelConn/CancelDelConn";

import PropTypes from 'prop-types'
import { useState } from "react";
import DelBS from "../components/BS/DelBS";

const Text2html = ({mode}) => {
  const [coordsBS, setCoordsBS] = useState([]);
  switch (mode) {
    case "AddBS": return <AddBS coords={coordsBS} setCoords={setCoordsBS}/>
    case "ApplyBS": return <ApplyBS coords={coordsBS} setCoords={setCoordsBS}/>
    case "CancelBS": return <CancelBS coords={coordsBS} setCoords={setCoordsBS}/>
    case "DelBS": return <DelBS coords={coordsBS} setCoords={setCoordsBS}/>

    case "ApplyEdit": return <ApplyEdit/>
    case "CancelEdit": return <CancelEdit/>
    case "Edit": return <Edit/>
    case "NextEdit": return <NextEdit/>

    case "DelConn": return <DelConn/>
    case "ApplyDel": return <ApplyDel/>
    case "CancelDelConn": return <CancelDelConn/>
  }
  return <></>
}
Text2html.propTypes = {
  mode: PropTypes.string
}

export default Text2html