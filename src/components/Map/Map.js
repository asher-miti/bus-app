import React, { useState, useCallback, useRef, useEffect } from "react";

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Search from "../Search/Search";
import Locate from "../Locate/Locate";
import styles from "./Map.module.css";
import Header from "../Ui/Header/Header";

// Map settings
const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 51.507351,
  lng: -0.12267,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Map zooms to location on search click
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading page";

  return (
    <div>
      <Header />
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
