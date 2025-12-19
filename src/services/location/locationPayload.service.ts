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
}: TransformLocationToPayloadRequest): Promise<any> => {
  const data = apiResponse?.data;
  const resp = data?.results?.[0] ?? data?.response ?? data;
  const componentsArray: any[] = resp?.address_components ?? [];

  const findComponent = (types: string[]) => {
    const found = componentsArray.find(c =>
      c?.types?.some((t: string) => types.includes(t)),
    );
    return found?.long_name ?? '';
  };
  const payload = {
    DriverID: driverDetails?.DriverID,
    VendorID: driverDetails?.VendorID,
    LP_ID: null,
    VehicleID: driverDetails?.VehicleID,
    MobileNo: driverDetails?.MobileNo,
    Lat: latitude,
    Lng: longitude,
    Speed: parseFloat(speed.toFixed(2)),
    Direction: direction?.toString(),
    City: findComponent(['sublocality_level_1']),
    District: findComponent(['administrative_area_level_3']),
    Taluka: findComponent(['locality']),
    State: findComponent(['administrative_area_level_1']),
    Pincode: findComponent(['postal_code']),
    Address: resp?.formatted_address ?? '',
    Driver_LPStatus: tripStatus,
    Status: status,
  };

  return payload;
};
