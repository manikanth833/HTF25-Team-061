import { Location } from '../types';

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// Calculate estimated walking time (average walking speed: 5 km/h)
export const calculateWalkingTime = (distanceInMeters: number): number => {
  const walkingSpeedKmH = 5;
  const walkingSpeedMs = walkingSpeedKmH * 1000 / 3600;
  return distanceInMeters / walkingSpeedMs / 60; // Return time in minutes
};

// Get route information between two locations
export const getRouteInfo = (from: Location, to: Location) => {
  const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);
  const estimatedTime = calculateWalkingTime(distance);

  return {
    from,
    to,
    distance,
    estimatedTime
  };
};
