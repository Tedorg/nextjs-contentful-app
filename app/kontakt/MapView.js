"use client";

import { useEffect, useRef } from "react";

export default function MapView({ coordinates, label }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!coordinates) return;

    // Dynamically import Leaflet only in the client
    import("leaflet").then((L) => {
      let latLng = null;
      try {
        if (typeof coordinates === "string") {
          const parsed = JSON.parse(coordinates);
          if (Array.isArray(parsed)) latLng = parsed;
          else if (parsed?.lat !== undefined && parsed?.lng !== undefined)
            latLng = [parsed.lat, parsed.lng];
        } else if (Array.isArray(coordinates)) {
          latLng = coordinates;
        } else if (coordinates?.lat !== undefined && coordinates?.lng !== undefined) {
          latLng = [coordinates.lat, coordinates.lng];
        }
      } catch (e) {
        console.error("Invalid coordinates for MapView:", e);
        return;
      }

      if (!latLng) {
        console.error("MapView: could not determine lat/lng from coordinates prop", coordinates);
        return;
      }

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map(containerRef.current, {
        center: latLng,
        zoom: 15,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png", {
        minZoom: 0,
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const marker = L.marker(latLng).addTo(map);
      if (label) marker.bindPopup(label);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {}
        mapRef.current = null;
      }
    };
  }, [coordinates, label]);

  if (!coordinates) return null;

  return (
    <div
      ref={containerRef}
      id="map"
      className="w-full h-[420px] rounded-lg border border-gray-200"
    />
  );
}