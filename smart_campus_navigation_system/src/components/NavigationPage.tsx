import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { Location } from '../types';
import { getRouteInfo } from '../utils/calculations';
import MapView from './MapView';

interface NavigationPageProps {
  locations: Location[];
}

export default function NavigationPage({ locations }: NavigationPageProps) {
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);

  // Filter out emergency locations for navigation dropdowns
  const buildingLocations = locations.filter((loc) => loc.type === 'building');

  // Calculate route information when both locations are selected
  const routeInfo = fromLocation && toLocation ? getRouteInfo(fromLocation, toLocation) : null;

  // Clear selection handler
  const handleClearSelection = () => {
    setFromLocation(null);
    setToLocation(null);
  };

  // Handle location selection
  const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const location = buildingLocations.find((loc) => loc.id === selectedId);
    setFromLocation(location || null);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const location = buildingLocations.find((loc) => loc.id === selectedId);
    setToLocation(location || null);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Control Panel */}
      <div className="w-full lg:w-96 bg-white shadow-lg p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Plan Your Route</h2>

        {/* From Location Dropdown */}
        <div className="mb-4">
          <label htmlFor="from" className="block text-sm font-semibold text-gray-700 mb-2">
            From
          </label>
          <select
            id="from"
            value={fromLocation?.id || ''}
            onChange={handleFromChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Select starting point</option>
            {buildingLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* To Location Dropdown */}
        <div className="mb-6">
          <label htmlFor="to" className="block text-sm font-semibold text-gray-700 mb-2">
            To
          </label>
          <select
            id="to"
            value={toLocation?.id || ''}
            onChange={handleToChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Select destination</option>
            {buildingLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Route Information Display */}
        {routeInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2 mb-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <h3 className="font-semibold text-blue-900">Route Information</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Distance:</span>
                <span className="font-semibold text-gray-900">
                  {routeInfo.distance.toFixed(0)} meters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Time:</span>
                <span className="font-semibold text-gray-900">
                  {routeInfo.estimatedTime.toFixed(1)} minutes
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Clear Button */}
        {(fromLocation || toLocation) && (
          <button
            onClick={handleClearSelection}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <X className="h-5 w-5" />
            Clear Selection
          </button>
        )}

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Map Legend</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Starting Point</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Destination</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Building</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-dashed"></div>
              <span className="text-gray-600">Walking Route</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 h-[500px] lg:h-auto">
        <MapView
          locations={locations}
          fromLocation={fromLocation}
          toLocation={toLocation}
        />
      </div>
    </div>
  );
}
