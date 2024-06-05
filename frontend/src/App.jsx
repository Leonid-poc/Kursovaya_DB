import { useState } from "react";
import Map from "./Map";
import Panel from "./Panel";

function App() {
  const [mode, setMode] = useState("none");
  return (
    <div className="App">

      <Panel setMode={setMode}/>
      <Map mode={mode} setMode={setMode}/>
      
    </div>
  )
}

export default App;
