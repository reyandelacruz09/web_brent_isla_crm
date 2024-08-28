import React, { useState } from "react";
import axios from "axios";

export interface GeocodeResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
}

const apiKey = "AIzaSyCW9dNNbT4HdtNNWnG2KY4lz-g9lhHwGMo"; // Replace with your Google Maps API key

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of Earth in km

  // Convert latitude and longitude from degrees to radians
  const radLat1 = lat1 * (Math.PI / 180);
  const radLon1 = lon1 * (Math.PI / 180);
  const radLat2 = lat2 * (Math.PI / 180);
  const radLon2 = lon2 * (Math.PI / 180);

  // Differences in coordinates
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

const App: React.FC = () => {
  const [address1, setAddress1] = useState<string>(
    "9065 Ibayong Tabon St., Parada, Sta. Maria, Bulacan, Philippines"
  );
  const [address2, setAddress2] = useState<string>("");
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCoordinates = async (
    address: string
  ): Promise<{ lat: number; lng: number }> => {
    try {
      const response = await axios.get<GeocodeResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      setError("Failed to fetch coordinates");
      throw error;
    }
  };

  const handleCalculateDistance = async () => {
    try {
      const coords1 = await getCoordinates(address1);
      const coords2 = await getCoordinates(address2);

      const distance = calculateDistance(
        coords1.lat,
        coords1.lng,
        coords2.lat,
        coords2.lng
      );
      setDistance(distance);
    } catch (error) {
      setError("Error calculating distance");
    }
  };

  return (
    <div>
      <h1>Distance Calculator</h1>
      <div>
        <label>
          Address 1:
          <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Address 2:
          <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCalculateDistance}>Calculate Distance</button>
      {distance !== null && <p>Distance: {distance.toFixed(2)} km</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
