import React, {useEffect, useRef} from "react";
import MapWrapper from "./MapWrapper";
import MapContext from "./providers/MapContext";
import { load } from "@2gis/mapgl";

export const Map = () => {
    const [_, setMapInstance] = React.useContext(MapContext);

    useEffect(() => {
        let map;
        console.log("test effect");
        load().then((mapglAPI) => {
            console.log("test load");
            map = new mapglAPI.Map('map-container', {
                center: [55.31878, 25.23584],
                zoom: 13,
                key: 'c04bd94e-b62f-4e03-b539-2ff413671907',
            });
        });
        // Сохраняем ссылку на карту
        setMapInstance(map);
        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};