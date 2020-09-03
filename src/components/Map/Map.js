import React, { useState } from "react";

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import "./Map.css";

// Map settings
const libraries = ["places"];
const mapContainerStyle = {
  width: "85vw",
  height: "85vh",
};

const center = {
  lat: 51.507351,
  lng: -0.127758,
};

const options = {
  styles: mapStyles,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading page";

  return (
    <div>
      <h2>
        Bus Times{" "}
        <span role="img" aria-label="bus">
          🚌
        </span>
      </h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={(event) => {
          setMarkers((current) => [
            ...current,
            {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            },
          ]);
        }}
      ></GoogleMap>
    </div>
  );
}
