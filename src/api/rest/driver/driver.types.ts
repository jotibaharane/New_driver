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

export interface driverOnlineOfflineRequest {
  DriverID: string;
  VendorID: string;
  Status: 'Online' | 'Offline';
}

export interface CustomerPostRequest {
  CustomerPostID: string;
  VerificationCode: string;
  CustomerID: string;
  DriverID: string;
}

export type Base64Image = string;

export interface LoadVerificationImages {
  CustomerPostID: string;
  CustomerID: string;
  DriverID: string;

  truckFrontView: Base64Image;
  emptyDhala: Base64Image;
  goodsLoadingStart: Base64Image;
  goodsLoadingHalf: Base64Image;
  goodsLoadingComplete: Base64Image;
  loadedCovered: Base64Image;
}
