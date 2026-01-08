// src/api/types/auth.types.ts

export enum ApiStatus {
  SUCCESS = '00',
  FAILURE = '01',
  UNAUTHORIZED = '02',
}
export interface ApiResponse {
  status: ApiStatus;
  message: string;
}

export interface LoginRequest {
  mobile_number: string;
}

export type ValidateOtpRequest = {
  mobile_number: string;
  otp: string;
};

export interface UserState {
  vendorid: string;
  companyType: string;
  companyName: string;
  owner_name: string;
  mobileNo: string;
  address1: string;
  address2: string;
  landMark: string;
  pincode: string;
  state: string;
  Tahsil: string;
  role: string;
  status: string;
  vendor_onboarded: boolean;
  kyc_verify: boolean;
  flag: string;
  isLogin?: boolean;
  token?: string | boolean;
}

export interface OtpValidationResponse {
  status: '00' | '01' | string;
  message: string;
  Driver_Details: DriverDetails;
}

export interface LoadPostSummary {
  LoadPostID: string;
  CustomerPostID: string;
  CustomerID: string;
  DriverID: string;

  Customer_ContactPerson: string;
  Customer_ContactNo: string;

  VehicleType: string;
  BodyType: string;
  Weight: string;

  CargoContent: string;
  CargoPackageType: string;

  CustomerStatus: 'Accepted' | 'Pending' | 'Rejected' | string;
  DriverStatus: 'Accepted' | 'Pending' | 'Rejected' | string;
  LP_Status: 'Pending' | 'Progress' | 'Completed' | 'Cancelled';

  PostInsertDate: string; // ISO Date
  PostUpdateDate: string; // ISO Date
}

export interface DriverDetails {
  DriverID: string;
  VendorID: string;

  full_name: string;
  Phone: string;
  MobileNo: string;

  VehicleID: string;
  registration_no: string;
  DriverVehicleType: string;

  AssignmentDate: string; // ISO Date
  insert_date: string; // ISO Date

  Status: 'Online' | 'Offline' | string;

  // 📍 Location
  Lat: number;
  Lng: number;
  City: string;
  District: string;
  Taluka: string;
  State: string;
  Pincode: string;
  Address: string;

  // 🚚 Load Post Status
  Driver_LPStatus: 'Accepted' | 'Pending' | 'Rejected' | string;

  LP_Details: LoadPostSummary[];
}

export interface ValidateOtpResponse extends ApiResponse {
  Driver_Details: DriverDetails;
}

export interface DriverDetails {
  DriverID: string;
  VendorID: string;
  full_name: string;
  Phone: string;
  MobileNo: string;
  VehicleID: string;
  registration_no: string;
  vehicleType: string;
  AssignmentDate: string; // ISO date string
  Status: 'Available' | 'Assigned' | 'On Trip' | string;
  Lat: number;
  Lng: number;
  City: string;
  District: string;
  Taluka: string;
  State: string;
  Pincode: string;
  Address: string;
  Driver_LPStatus: 'Active' | 'Inactive' | string;
  insert_date: string; // ISO date string
}
