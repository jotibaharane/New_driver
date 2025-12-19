interface Coordinates {
  lat: number;
  lng: number;
}
interface Components {
  place: string;
  dist: string;
  tal: string;
  state: string;
  pincode: string;
}
interface Origin {
  address: string;
  coordinates: Coordinates;
  components: Components;
}
interface Route {
  state: string;
  region: string;
  districts: string;
}
export interface PostDriverPayload {
  LoadPost_ID: string;
  driverID: string;
  vendorid: string;
  origin: Origin;
  // destination: Route[];
  routes: Route[];
  vehicleType: string;
  reportingTime: string;
  vehicleStatus: string;
  vehicleNumber: string;
  driverMobile: string;
}
