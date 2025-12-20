export interface DriverLoadPost {
  Customer_LoadPostID: string;
  DriverStatus: string;
  DriverID: string;
  CustomerID: string;
  VendorID: string;
  LP_Status: string;
  Driver_LPStatus: string;
  CustomerStatus: string;

  DriverLat: number;
  DriverLng: number;
  DriverMobile: string;
  DriverVehicleNumber: string;
  DriverLastUpdate: string;

  DriverAvailabilityStatus: string;
  DriverVehicleStatus: string;
  DriverCurrentLoadPostID: string;

  PostDate: string;
  PickupLocation: string;
  Origin_Lat: number;
  Origin_Lng: number;

  Destination_Lat: number;
  Destination_Lng: number;
  PickupDistanceKm: number;
  DestinationLocation: string;
  DestinationDistanceKm: number;

  VehicleType: string;
  BodyType: string;
  CargoContent: string;
  CargoPackageType: string;
  ApproxWeight: string;

  ExpectedAvailableTime: string;
  RemainingMinutes: number;
  RemainingTimeFormatted: string;

  CargoTypes_IMG: string;
  Cargopackag_IMG: string;
  Vehicle_IMG: string;
}
