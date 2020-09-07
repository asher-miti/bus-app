import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

import { Search, Locate, Header, Spinner } from "./components";
import "./App.css";

const url = "http://transportapi.com/v3/uk/places.json";
const apiKey = process.env.REACT_APP_TRANSPORT_API_KEY;
const apiId = process.env.REACT_APP_TRANSPORT_API_ID;

// Map settings
const libraries = ["places"];
const mapContainerStyle = {
  width: "90vw",
  height: "80vh",
  position: "absolute",
  top: "55%",
  right: "50%",
  transform: "translate(50%,-50%)",
};
const center = { lat: 51.507351, lng: -0.12267 };

const Map = () => {
  const [location, setLocation] = useState(center);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios.get(url, {
        params: {
          lat: location.lat,
          lon: location.lng,
          type: "bus_stop",
          app_key: apiKey,
          app_id: apiId,
        },
      });

      setMarkers([]);

      const busStops = result.data.member;

      console.log(busStops);

      busStops.forEach((busStop) => {
        // expand bounds for each marker

        setMarkers((current) => [
          ...current,
          {
            lat: busStop.latitude,
            lng: busStop.longitude,
            time: new Date(),
          },
        ]);
      });
    };

    fetchItems();
  }, [location]);

  // Loading Google maps with API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const [selectedCenter, setSelectedCenter] = useState(null);

  const onMapClick = useCallback((event) => {
    setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Map zooms to location on search click
  const panTo = useCallback(({ lat, lng }) => {
    // GET THE MAP IN BOUNDS OF MARKERS!!!
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return <Spinner />;

  return (
    <div>
      <Header />
      <Search panTo={panTo} />
      <Locate panTo={panTo} setLocation={setLocation} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={location}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelectedCenter(marker);
            }}
          />
        ))}
        {selectedCenter && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedCenter(null);
            }}
            position={{
              lat: selectedCenter.latitude,
              lng: selectedCenter.longitude,
            }}
          >
            <div>
              <h4>{selectedCenter.name}</h4>
              <h5>towards...</h5>
              <h5>198</h5>
              <p>2 min</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
