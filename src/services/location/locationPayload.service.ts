import { DriverLocationPayload } from '@socket/socket.emitters';

interface TransformLocationToPayloadRequest {
  driverDetails: any;
  latitude: any;
  longitude: any;
  speed: any;
  apiResponse: any;
  direction: any;
  tripStatus: any;
  status: any;
}

export const transformLocationToPayload = async ({
  driverDetails,
  latitude,
  longitude,
  speed,
  apiResponse,
  direction,
  tripStatus,
  status,
}: TransformLocationToPayloadRequest): Promise<DriverLocationPayload> => {
  const data = apiResponse?.data;
  const resp = data?.results?.[0] ?? data?.response ?? data;
  const componentsArray: any[] = resp?.address_components ?? [];

  const findComponent = (types: string[]) => {
    const found = componentsArray.find(c =>
      c?.types?.some((t: string) => types.includes(t)),
    );
    return found?.long_name ?? '';
  };
  const payload: DriverLocationPayload = {
    Address: resp?.formatted_address ?? '',
    City: findComponent(['sublocality_level_1']),
    Direction: direction?.toString(),
    District: findComponent(['administrative_area_level_3']),
    Driver_LPStatus: tripStatus,
    DriverID: driverDetails?.DriverID,
    lat: latitude,
    lng: longitude,
    MobileNo: driverDetails?.MobileNo,
    Pincode: findComponent(['postal_code']),
    Speed: parseFloat(speed.toFixed(2))?.toString(),
    State: findComponent(['administrative_area_level_1']),
    Status: status,
    Taluka: findComponent(['locality']),
    VehicleID: driverDetails?.VehicleID,
    VendorID: driverDetails?.VendorID,
  };

  return payload;
};
