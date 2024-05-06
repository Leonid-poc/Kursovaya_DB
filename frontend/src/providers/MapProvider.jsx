import React from "react";
import MapContext from "./MapContext";

const MapProvider = (props) => {
    const [mapInstance, setMapInstance] = React.useState();

    return (
        <MapContext.Provider value={[mapInstance, setMapInstance]}>
            {props.children}
        </MapContext.Provider>
    );
};

export default MapProvider