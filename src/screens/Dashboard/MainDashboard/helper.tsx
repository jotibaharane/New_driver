interface transformLocationToOriginRequest {
  apiResponse: any;
  latitude: any;
  longitude: any;
}

interface transformLocationToOriginResponse {
  address: string;
  coordinates: {
    lat: any;
    lng: any;
  };
  components: {
    place: any;
    dist: any;
    tal: any;
    state: any;
    pincode: any;
  };
}
export const transformLocationToOrigin = async ({
  apiResponse,
  latitude,
  longitude,
}: transformLocationToOriginRequest): Promise<transformLocationToOriginResponse> => {
  const data = apiResponse?.data;
  const resp = data?.results?.[0] ?? data?.response ?? data;
  const componentsArray: any[] = resp?.address_components ?? [];

  const findComponent = (types: string[]) => {
    const found = componentsArray.find(c =>
      c?.types?.some((t: string) => types.includes(t)),
    );
    return found?.long_name ?? '';
  };

  const origin = {
    address: resp?.formatted_address ?? '',
    coordinates: {
      lat: latitude,
      lng: longitude,
    },
    components: {
      place: findComponent(['sublocality_level_1']),
      dist: findComponent(['administrative_area_level_3']),
      tal: findComponent(['locality']),
      state: findComponent(['administrative_area_level_1']),
      pincode: findComponent(['postal_code']),
    },
  };

  return origin;
};

interface TransformLocationToPayloadRequest {
  driverDetails: any;
  latitude: any;
  longitude: any;
  speed: any;
  apiResponse: any;
  direction: any;
}

export const transformLocationToPayload = async ({
  driverDetails,
  latitude,
  longitude,
  speed,
  apiResponse,
  direction,
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
    TripID: null,
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
    DriverTripStatus: driverDetails?.DriverTripStatus,
    Status: driverDetails?.Status,
  };

  return payload;
};

export const getBearing = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const toDeg = (v: number) => (v * 180) / Math.PI;

  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};
