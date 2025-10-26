export interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: 'building' | 'emergency';
  description: string;
}

export interface RouteInfo {
  from: Location;
  to: Location;
  distance: number;
  estimatedTime: number;
}
