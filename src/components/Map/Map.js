import React, { useState, useCallback, useRef } from "react";

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Search from '../Search/Search'

// Map settings
const libraries = ["places"];
const mapContainerStyle = {
  width: "85vw",
  height: "85vh",
};

const center = {
  lat: 51.507351,
  lng: -0.122670,
};

export default function Map() {
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
        }, [])

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // Map zooms to location on search click
  const panTo = useCallback(({lat,lng}) => {
    mapRef.current.panTo({lat,lng})
    mapRef.current.setZoom(18)

  }, [])

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

      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
      {markers.map((marker) => (
        <Marker
        key={marker.time.toISOString()}
        position={{lat: marker.lat, lng:marker.lng}} />
      ))}
      </GoogleMap>
    </div>
  );
}

