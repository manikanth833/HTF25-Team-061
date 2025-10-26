import { useState } from 'react';
import { AlertCircle, Phone, MapPin } from 'lucide-react';
import { Location } from '../types';
import MapView from './MapView';
import { LatLngExpression } from 'leaflet';

interface EmergencyPageProps {
  locations: Location[];
}

export default function EmergencyPage({ locations }: EmergencyPageProps) {
  const [selectedEmergency, setSelectedEmergency] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([17.3946, 78.3180]);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Filter emergency locations
  const emergencyLocations = locations.filter((loc) => loc.type === 'emergency');

  // Handle emergency location selection
  const handleEmergencyClick = (location: Location) => {
    setSelectedEmergency(location);
    setMapCenter([location.lat, location.lng]);
    setMapZoom(18);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Emergency Panel */}
      <div className="w-full lg:w-96 bg-white shadow-lg p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Emergency Services</h2>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            <strong>In case of emergency:</strong> Select a location below to view on the map and get quick access.
          </p>
        </div>

        {/* Emergency Locations List */}
        <div className="space-y-3">
          {emergencyLocations.map((location) => (
            <div
              key={location.id}
              className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                selectedEmergency?.id === location.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
              }`}
              onClick={() => handleEmergencyClick(location)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  {location.name}
                </h3>
                {selectedEmergency?.id === location.id && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{location.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEmergencyClick(location);
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                View on Map
              </button>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Emergency Contacts
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Medical Room:</span>
              <a href="tel:040-xxxx-xxxx" className="font-semibold text-blue-600 hover:underline">
                040-xxxx-xxxx
              </a>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Security Office:</span>
              <a href="tel:040-xxxx-xxxx" className="font-semibold text-blue-600 hover:underline">
                040-xxxx-xxxx
              </a>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Admin Office:</span>
              <a href="tel:040-xxxx-xxxx" className="font-semibold text-blue-600 hover:underline">
                040-xxxx-xxxx
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Police:</span>
                <a href="tel:100" className="font-semibold text-red-600 hover:underline">
                  100
                </a>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">Ambulance:</span>
                <a href="tel:108" className="font-semibold text-red-600 hover:underline">
                  108
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 h-[500px] lg:h-auto">
        <MapView
          locations={locations}
          fromLocation={null}
          toLocation={selectedEmergency}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
    </div>
  );
}
