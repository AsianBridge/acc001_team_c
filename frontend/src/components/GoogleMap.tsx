import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import api from "../api/api";
import { Loader } from "@googlemaps/js-api-loader";

const containerStyle = {
  width: "100vw",
  height: "400px",
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
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(async () => {
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
          mapId: "DEMO_MAP_ID", // Map ID is required for advanced markers.
        },
      );
      setMap(mapInstance);

      const markerInstance = new AdvancedMarkerElement({
        map: mapInstance,
        position: location,
        title: "Location",
      });
      setMarker(markerInstance);
    });
  }, [apiKey, location]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (storeId) {
          const getStoreResponse = await api.getStoreByStoreId(storeId);
          if (getStoreResponse.body && getStoreResponse.body.address) {
            const data = await api.getStoreByAddress(
              getStoreResponse.body.address,
            );
            if (data.results.length > 0) {
              const location = data.results[0].geometry.location;
              setLocation(location);
              if (map) {
                map.setCenter(location);
                if (marker) {
                  marker.position = location;
                } else {
                  const newMarker =
                    new google.maps.marker.AdvancedMarkerElement({
                      map: map,
                      position: location,
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

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <div id="map" style={containerStyle}></div>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
