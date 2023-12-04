import Map, { GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MyMap() {
    return (
        <Map
            mapboxAccessToken="pk.eyJ1IjoidGhld2puOTIiLCJhIjoiY2xwOXkydWluMDJnbDJrcHJuc3ljM2VjcyJ9.3QcFlXWDpwPe4nBiP5dZ3g"
            initialViewState={{
                longitude: -100,
                latitude: 40,
                zoom: 3.5,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            style={{ height: "100%", width: "100%" }}
        >
            <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
            />
        </Map>
    );
}
export default MyMap;
