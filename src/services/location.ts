import { supabase } from './supabase';

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

let watchId: number | null = null;
let positionCallback: ((pos: GeoPosition) => void) | null = null;

export function startLocationTracking(callback: (pos: GeoPosition) => void): Promise<boolean> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(false);
      return;
    }
    positionCallback = callback;
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const geo: GeoPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        };
        callback(geo);
      },
      () => resolve(false),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );
    resolve(true);
  });
}

export function stopLocationTracking(): void {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  positionCallback = null;
}

export async function getCurrentPosition(): Promise<GeoPosition | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        timestamp: pos.timestamp,
      }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

// Subscribe to realtime location updates for a check-in
export function subscribeToLocation(checkInId: string, onUpdate: (loc: GeoPosition) => void) {
  const channel = supabase
    .channel(`checkin:${checkInId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'check_ins',
        filter: `id=eq.${checkInId}`,
      },
      (payload) => {
        const loc = payload.new.last_location;
        if (loc) onUpdate(loc as GeoPosition);
      }
    )
    .subscribe();
  return channel;
}
