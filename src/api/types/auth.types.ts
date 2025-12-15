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
export interface DriverDetails {
  AssignmentID: string;
  DriverID: string;
  full_name: string;
  Phone: string;
  MobileNo: string;
  VehicleID: string;
  registration_no: string;
  VehicleType: string;
  AssignmentDate: string; // ISO date string
  Status: string;
  Lat: number;
  Lng: number;
  City: string;
  District: string;
  Taluka: string;
  State: string;
  Pincode: string;
  Address: string;
  insert_date: string; // ISO date string
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
  DriverTripStatus: 'Active' | 'Inactive' | string;
  insert_date: string; // ISO date string
}
