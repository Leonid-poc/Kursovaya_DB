import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import Text2html from "./vendor/Text2html";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getBS, sendData } from "./vendor/data";

const colors = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#800000",
  "#008000",
  "#000080",
  "#808000",
  "#800080",
  "#008080",
  "#C0C0C0",
  "#808080",
  "#FFA500",
  "#A9A9A9",
  "#A52A2A",
  "#224080",
  "#D19275",
  "#CCA6D6",
  "#F0FFF0",
  "#0D98BA",
  "#3B9C9C",
  "#6699FF",
  "#3AB54A",
  "#B05778",
  "#D4A121",
  "#F57584",
  "#F5DEC4",
  "#A52A2A",
  "#199EBD",
  "#DEDDE1",
  "#CCCCFF",
  "#FF6037",
  "#FF9966",
  "#D29D98",
  "#56A0D3",
  "#856088",
  "#F38FA9",
  "#E3A857",
  "#D1A457",
  "#DAA520",
  "#E08D3C",
  "#AA98A9",
  "#8E594C",
  "#3D2B1F",
  "#423921",
  "#1A2B35",
  "#2B5458",
];

// eslint-disable-next-line react/prop-types
const Map = ({ mode, setMode }) => {
  const [staticState, _] = useState(null);
  const center = [51.77629, 55.110047];
  const [randomColor, setRandomColor] = useState({
    color: colors[Math.floor(Math.random() * colors.length)],
    weight: 5
  });
  const [globalCoordsBS, setGlobalCoordsBS] = useState([]);
  useEffect(() => {
    getBS().then((data)=>{
      let e = [];
      for (const element of data.data) {
        e.push({
          desc: element.name,
          lat: element.latitude,
          lng: element.longitude,
          status: "old",
          color: "blue"
        });
      }
      console.log(e);
      setGlobalCoordsBS(e);
    })
  }, [staticState])

  const [globalLines, setGlobalLines] = useState([{route: "", color: randomColor, coords: []}]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (mode === "CancelEdit") setLines([]);
    if (mode === "NextEdit") {
      setRandomColor({
        color: colors[Math.floor(Math.random() * colors.length)],
        weight: 5
      })
      const prom = prompt("Введите название маршрута");
      setGlobalLines(prev => [...prev, {route: prom, color: randomColor, coords: lines}]);
    }
    else if (mode !== "Edit" && mode !== "NextEdit" && lines.length != 0) {
      const prom = prompt("Введите название маршрута");
      setGlobalLines(prev => [...prev, {route: prom, color: randomColor, coords: lines}]);
      setLines([]);
    }
    if (mode === "ApplyEdit" || mode === "ApplyDel") {
      setGlobalLines(prev => prev);
      setTimeout(() => {
        sendData(globalCoordsBS, globalLines);
      }, 2000)
    }
  }, [mode, lines])

  const e = <Text2html mode={mode} setGlobalCoordsBS={setGlobalCoordsBS} setGlobalLines={setGlobalLines} globalCoordsBS={globalCoordsBS}/>;

  const handleMakerMap = (coord) => {
    if (mode === "DelBS") {
      setGlobalCoordsBS(globalCoordsBS.filter(el => el !== coord && el.route !== ""));
      // setGlobalCoordsBS(globalCoordsBS.map(elem => {
      //   if (elem == el) return {...elem, status: "del"}
      //   return elem;
      // }))
      console.log(coord);
      setGlobalLines(prev => prev.map(elem => {
        return {
          color: elem.color,
          coords: elem.coords.filter(elem_ => elem_[2].BS != coord.desc)
        }
      }));
      setGlobalCoordsBS(globalCoordsBS.map(elem => {
        if (elem == coord) return {...elem, status: "del"}
        return elem;
      }))
    }

    if (mode === "NextEdit") {
      setMode("Edit");
      setLines([[coord.lat, coord.lng, {BS: coord.desc}]]);
    }
    if (mode === "Edit") {
      setLines(prev => [...prev, [coord.lat, coord.lng, {BS: coord.desc}]])
    }

  }

  const handlePolyLine = (el) => {
    if (mode === "DelConn") {
      setGlobalLines(globalLines.filter(elem => elem != el && elem.route !== ""));
      console.log(globalLines);
    }
  }
  // const polyline = [
  //   [51.78629, 55.110047, {from: []}],
  //   [51.77629, 55.110047, {from: []}],
  //   [51.77629, 55.120047, {from: []}],
  // ]

  return (
    <MapContainer center={center} zoom={16.77} scrollWheelZoom={false}>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {globalCoordsBS.map((el, i) => {
        if (el.status == "del") return
        return (
          <Marker key={i} position={[el.lat, el.lng]} eventHandlers={{click: () => {handleMakerMap(el)}}}>
            <Popup>
              {el.desc}
            </Popup>
          </Marker>
        )
      }
      
      )}
      {e}
      {(mode === "Edit" && <Polyline pathOptions={randomColor} positions={lines}/>)}
      {globalLines.map((el, i) => (
        <Polyline positions={el.coords} key={i} pathOptions={el.color} eventHandlers={{click: () => {handlePolyLine(el)}}}/>
      ))}
      <Polyline positions={lines} pathOptions={randomColor} eventHandlers={{click: (e) => {console.log(e);}}}/>
    </MapContainer>
  );
};

export default Map;
