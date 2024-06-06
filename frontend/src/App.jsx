import { useState } from "react";
import Map from "./Map";
import Panel from "./Panel";
import InfoRoute from "./InfoRoute";

function App() {
  const [globalLines, setGlobalLines] = useState([{route: "", color: {color: "green", weight: 5}, coords: []}]);
  const [mode, setMode] = useState("none");
  return (
    <div className="App">

      <Panel setMode={setMode}/>
      <Map mode={mode} setMode={setMode} globalLines={globalLines} setGlobalLines={setGlobalLines}/>
      <InfoRoute globalLines={globalLines}/>
    </div>
  )
}

export default App;
