import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Location } from '../types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Custom marker icons
const defaultIcon = new Icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const createCustomIcon = (color: string) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path fill="${color}" stroke="white" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const greenIcon = createCustomIcon('#10b981');
const redIcon = createCustomIcon('#ef4444');
const blueIcon = createCustomIcon('#3b82f6');
const emergencyIcon = createCustomIcon('#dc2626');

// Component to handle map center changes
function MapController({ center, zoom }: { center: LatLngExpression; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom || map.getZoom());
  }, [center, zoom, map]);

  return null;
}

interface MapViewProps {
  locations: Location[];
  fromLocation: Location | null;
  toLocation: Location | null;
  center?: LatLngExpression;
  zoom?: number;
}

export default function MapView({
  locations,
  fromLocation,
  toLocation,
  center = [17.3946, 78.3180],
  zoom = 16
}: MapViewProps) {
  // Determine which icon to use for each location
  const getMarkerIcon = (location: Location) => {
    if (location.type === 'emergency') return emergencyIcon;
    if (fromLocation && location.id === fromLocation.id) return greenIcon;
    if (toLocation && location.id === toLocation.id) return redIcon;
    return blueIcon;
  };

  // Create route line if both locations are selected
  const routeLine: LatLngExpression[] =
    fromLocation && toLocation
      ? [[fromLocation.lat, fromLocation.lng], [toLocation.lat, toLocation.lng]]
      : [];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController center={center} zoom={zoom} />

      {/* Render all location markers */}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={getMarkerIcon(location)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg mb-1">{location.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Type:</span> {location.type === 'emergency' ? 'Emergency' : 'Building'}
              </p>
              <p className="text-sm text-gray-700">{location.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render route line */}
      {routeLine.length > 0 && (
        <Polyline
          positions={routeLine}
          color="#3b82f6"
          weight={4}
          opacity={0.7}
          dashArray="10, 10"
        />
      )}
    </MapContainer>
  );
}
