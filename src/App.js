import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

import { Search, Locate, Header, Spinner, BusInfo } from "./components";
import "./App.css";

const url = "http://transportapi.com/v3/uk/places.json";
const apiKey = process.env.REACT_APP_TRANSPORT_API_KEY;
const apiId = process.env.REACT_APP_TRANSPORT_API_ID;

const mapContainerStyle = {
  width: "90vw",
  height: "83vh",
  position: "absolute",
  top: "55%",
  right: "50%",
  borderRadius: "5px",
  boxShadow: "3px 3px 5px 6px #ccc",
  transform: "translate(50%,-50%)",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
};

const libraries = ["places"];

// Settings for London on map initial render
const center = { lat: 51.507351, lng: -0.12267 };

const Map = () => {
  const [location, setLocation] = useState(center);
  const [markers, setMarkers] = useState([]);
  const [currentMarker, setCurrentMarker] = useState(null);
  const mapRef = useRef();

  // Fetching TransportAPI data
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

      result.data.member.forEach((busStop) => {
        setMarkers((current) => [...current, busStop]);
      });
    };

    fetchItems();
  }, [location]);

  // Loading Google maps with API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCjpx1_4h2r8GcLcgbqn-V9ei5IpzCAmXc",
    libraries,
  });

  const onMapClick = useCallback((event) => {
    setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Map zooms to location on search click
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(9);
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
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.atcocode}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={{
              url: "https://img.icons8.com/emoji/48/000000/round-pushpin-emoji.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={() => setCurrentMarker(marker)}
          />
        ))}
        {currentMarker && (
          <InfoWindow
            position={{ lat: currentMarker.latitude, lng: currentMarker.longitude }}
            onCloseClick={() => setCurrentMarker(null)}
          >
            <BusInfo busStopInfo={currentMarker} />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
