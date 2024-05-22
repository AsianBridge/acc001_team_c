import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import api from "../api/api";

const containerStyle = {
  width: "100vw",
  height: "400px",
};

const center = {
  lat: 35.6895, // Default center (Tokyo)
  lng: 139.6917,
};

type GoogleMapComponentProps = {
  storeId: string;
};

const GoogleMapComponent = ({ storeId }: GoogleMapComponentProps) => {
  const [location, setLocation] = useState(center);
  const [obtainedStore, setObtainedStore] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

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
              setObtainedStore(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching store information: ", error);
      }
    };
    getLocation();
  }, [storeId]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded && obtainedStore ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={15}
    ></GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapComponent;
