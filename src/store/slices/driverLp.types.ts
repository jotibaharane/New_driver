import { TRIP_STATUS } from './authSlice';

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
  PickupLat: number;
  PickupLng: number;

  DeliveryLat: number;
  DeliveryLng: number;
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

export interface AcceptedLoadPostDetails {
  Customer_ContactNo: string;
  Customer_ContactPerson: string;

  LoadPostID: string;
  CustomerID: string;

  Origin: string;
  Destination: string;

  VehicleType: string;
  Weight: string;

  verify_flag: 'Y' | 'N';
  verification_code: string;

  BodyType: string;
  CargoContent: string;
  CargoPackageType: string;

  ExpectedAvailableTime: string; // ISO date string
  PostInsertDate: string; // ISO date string
  PostUpdateDate: string | null;

  Approximate_weight: string;
  PickupType: string;

  PickupLat: number;
  PickupLng: number;
  Origin_City: string;
  Origin_District: string;
  Origin_Taluka: string;
  Origin_State: string;
  Origin_Pincode: string;

  DeliveryLat: number;
  DeliveryLng: number;
  Destination_City: string;
  Destination_District: string;
  Destination_Taluka: string;
  Destination_State: string;
  Destination_Pincode: string;

  AddressInsertDate: string; // ISO date string
  AddressUpdateDate: string | null;

  CustomerPostID: string;
  cpsCustomerID: string;

  VendorID: string | null;
  DriverID: string;

  CustomerStatus: 'Pending' | 'Accepted' | 'Rejected' | string;
  VendorStatus: string | null;
  DriverStatus: 'Accepted' | 'Pending' | 'Rejected' | string;
  LP_Status: TRIP_STATUS;

  DriverLat: number;
  DriverLng: number;

  dllDriverID: string;
  MobileNo: string;
}
