export interface DriverLoadPost {
  // LoadPostID: string;
  // DriverStatus: string;
  // DriverID: string;
  // CustomerID: string;
  // VendorID: string;
  // LP_Status: string;
  // Driver_LPStatus: string;
  // CustomerStatus: string;

  // DriverLat: number;
  // DriverLng: number;
  // DriverMobile: string;
  // DriverVehicleNumber: string;
  // DriverLastUpdate: string;

  // DriverAvailabilityStatus: string;
  // DriverVehicleStatus: string;
  // DriverCurrentLoadPostID: string;

  // PostDate: string;
  // PickupLocation: string;
  // PickupLat: number;
  // PickupLng: number;

  // DeliveryLat: number;
  // DeliveryLng: number;
  // PickupDistanceKm: number;
  // DestinationLocation: string;
  // DestinationDistanceKm: number;

  // VehicleType: string;
  // BodyType: string;
  // CargoContent: string;
  // CargoPackageType: string;
  // ApproxWeight: string;

  // ExpectedAvailableTime: string;
  // RemainingMinutes: number;
  // RemainingTimeFormatted: string;

  // CargoTypes_IMG: string;
  // Cargopackag_IMG: string;
  // Vehicle_IMG: string;
   LoadPostID:string,
          CustomerID: string,
          VehicleType: string,
          BodyType: string,
          CargoContent: string,
          CargoPackageType: string,
          ApproxWeight: string,
          DhalaLength: string,
          Origin: string,
          Destination: string,
          PickupLat: number,
          PickupLng: number,
          DeliveryLat: number,
          DeliveryLng: number,
          PickupDistanceKm: number,
          DestinationDistanceKm: number,
          DistanceInKm:
            number,
          PostDate:any,
          ExpectedAvailableTime:any,
          RemainingMinutes:any,
          RemainingTimeFormatted:any,
          status: string,
          Amount: string,
          VehicleImage: any,
          ProductImage: any,
          Cargopackag_IMG: any,
          Vehicle_IMG: any,
}

export interface AcceptedLoadPostDetails {
  // ===== IDs =====
  LoadPostID: string;
  CustomerID: string;
  CustomerPostID: string;
  VendorID: string | null;
  DriverID: string | null;

  // ===== Pickup Details =====
  PickupContactPerson: string;
  PickupCompanyName: string;
  PickupContactNumber: string;
  PickupPlotBuilding: string;
  PickupStreetArea: string;
  PickupAddress: string;

  PickupCity: string;
  PickupDistrict: string;
  PickupTaluka: string;
  PickupState: string;
  PickupPincode: string;
  PickupLat: number;
  PickupLng: number;

  // ===== Delivery Details =====
  DeliveryContactPerson: string;
  DeliveryCompanyName: string;
  DeliveryContactNumber: string;
  DeliveryPlotBuilding: string;
  DeliveryStreetArea: string;
  DeliveryAddress: string;

  DeliveryCity: string;
  DeliveryDistrict: string;
  DeliveryTaluka: string;
  DeliveryState: string;
  DeliveryPincode: string;
  DeliveryLat: number;
  DeliveryLng: number;

  // ===== Vehicle & Cargo =====
  VehicleType: string;
  BodyType: string;
  cargo_type: 'Normal' | 'Hazardous' | string;
  CargoContent: string;
  CargoPackageType: string;

  Weight: string;
  Approximate_weight: number;
  isVolumetric: boolean;
  DhalaLength: number | null;

  // ===== Scheduling =====
  ExpectedAvailableTime: string;
  ScheduleDate: string | null;
  ScheduleTime: string | null;

  // ===== Status & Verification =====
  master_status: 'Y' | 'N';
  verification_code: string;
  verify_flag: 'Y' | 'N';

  CustomerStatus: 'Pending' | 'Accepted' | 'Rejected' | string;
  VendorStatus: 'Pending' | 'Accepted' | 'Rejected' | null;
  DriverStatus: 'Pending' | 'Accepted' | 'Rejected' | string;
  LP_Status: 'Pending' | 'Progress' | 'Completed' | 'Cancelled';

  // ===== Cost =====
  cost: number;

  // ===== Audit Dates =====
  LoadPost_InsertDate: string; // ISO Date
  LoadPost_UpdateDate: string; // ISO Date
  Address_InsertDate: string; // ISO Date
  Address_UpdateDate: string; // ISO Date
  DriverLng?: any;
  DriverLat?: any;
}
