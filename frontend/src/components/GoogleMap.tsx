import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import api from "../api/api";
import { Loader } from "@googlemaps/js-api-loader";
import { Typography } from "@mui/material";

const containerStyle = {
  width: "50vw",
  height: "50vw",
};

const center = {
  lat: 35.6895,
  lng: 139.6917,
};

type GoogleMapComponentProps = {
  storeId: string;
};

const GoogleMapComponent = ({ storeId }: GoogleMapComponentProps) => {
  const [location, setLocation] = useState(center);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  // Store location fetching
  useEffect(() => {
    const getLocation = async () => {
      try {
        if (storeId) {
          const getStoreResponse = await api.getStoreByStoreId(storeId);
          if (getStoreResponse.body && getStoreResponse.body.address) {
            setAddress(getStoreResponse.body.address);
            const data = await api.getStoreByAddress(
              getStoreResponse.body.address,
            );
            if (data.results.length > 0) {
              const newLocation = data.results[0].geometry.location;
              setLocation(newLocation);
              if (map) {
                map.setCenter(newLocation);
                if (marker) {
                  marker.position = newLocation;
                } else {
                  const newMarker =
                    new google.maps.marker.AdvancedMarkerElement({
                      map: map,
                      position: newLocation,
                      title: "Location",
                    });
                  setMarker(newMarker);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching store information: ", error);
      }
    };
    getLocation();
  }, [storeId, map, marker]);

  // Google Maps API initialization
  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader
      .importLibrary("maps")
      .then(async () => {
        const { Map } = (await google.maps.importLibrary(
          "maps",
        )) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;

        const mapInstance = new Map(
          document.getElementById("map") as HTMLElement,
          {
            center: location,
            zoom: 15,
            mapId: "DEMO_MAP_ID",
            disableDefaultUI: true,
          },
        );
        setMap(mapInstance);

        const markerInstance = new AdvancedMarkerElement({
          map: mapInstance,
          position: location,
          title: "Location",
        });
        setMarker(markerInstance);
      })
      .catch((error) => {
        console.error("Error loading Google Maps API: ", error);
      });
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <>
      <Typography>住所:&ensp;{address}</Typography>
      <div id="map" style={containerStyle}></div>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
