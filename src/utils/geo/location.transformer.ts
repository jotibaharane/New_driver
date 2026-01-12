interface TransformLocationToOriginRequest {
  apiResponse: any;
  latitude: number;
  longitude: number;
}

export interface TransformLocationToOriginResponse {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  components: {
    place: string;
    dist: string;
    tal: string;
    state: string;
    pincode: string;
  };
}

export const transformLocationToOrigin = ({
  apiResponse,
  latitude,
  longitude,
}: TransformLocationToOriginRequest): TransformLocationToOriginResponse => {
  const data = apiResponse?.data;
  const resp = data?.results?.[0] ?? data?.response ?? data;
  const componentsArray: any[] = resp?.address_components ?? [];

  const findComponent = (types: string[]) =>
    componentsArray.find(c => c?.types?.some((t: string) => types.includes(t)))
      ?.long_name ?? '';

  return {
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
};
