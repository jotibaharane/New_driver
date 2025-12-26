import { ENV } from '@config/env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DistrictData,
  DistrictRequest,
  GetLocationListRequest,
  PincodeRequest,
  PincodeResponse,
} from './hooks.type';

export const locationApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: ENV.API_URL,
  }),
  endpoints: builder => ({
    getAddressByPin: builder.mutation<PincodeResponse, PincodeRequest>({
      query: queryArg => ({
        url: `/pincode`,
        method: 'POST',
        body: queryArg,
      }),
    }),
    getState: builder.query<
      {
        status: string;
        message: string;
        data: { label: string; value: string }[];
      },
      void
    >({
      query: () => ({
        url: '/get_state_region_district',
        method: 'POST',
      }),
      transformResponse: (response: {
        status: string;
        message: string;
        data: { state: string }[];
      }) => {
        return {
          ...response,
          data: response.data
            .filter(item => item.state && item.state !== 'NA')
            .map(item => ({
              label: item.state.trim(),
              value: item.state.trim(),
            })),
        };
      },
    }),
    getDistrict: builder.query<
      {
        status: string;
        message: string;
        data: { label: string; value: string }[];
      },
      DistrictRequest
    >({
      query: queryArg => ({
        url: '/get_state_district_block',
        method: 'POST',
        body: queryArg,
      }),
      transformResponse: (response: {
        status: string;
        message: string;
        data: DistrictData[];
      }) => {
        return {
          ...response,
          data: response.data
            .filter(item => item?.district && item?.district !== 'NA')
            .map(item => ({
              label: item?.district?.trim(),
              value: item?.district?.trim(),
            })),
        };
      },
    }),
    getTaluka: builder.query<any, any>({
      query: body => ({
        url: '/get_state_district_block',
        method: 'POST',
        body,
      }),
      transformResponse: (response: {
        status: string;
        message: string;
        data: any[];
      }) => {
        return {
          ...response,
          data: response.data
            .filter(item => item?.division && item?.division !== 'NA')
            .map(item => ({
              label: item?.division?.trim(),
              value: item?.division?.trim(),
            })),
        };
      },
    }),

    nearbyCustomersPost: builder.query<
      { status: string; message: string; data: any[] },
      GetLocationListRequest
    >({
      query: payload => ({
        url: '/get_Nearest_Customer_post',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: {
        status: string;
        message: string;
        data: any[];
      }) => ({
        ...response,
        data: response.data.map((p): any => ({
          LoadPostID: p.Customer_LoadPostID ?? 'N/A',
          CustomerID: p.CustomerID ?? '',
          VehicleType: p.VehicleType ?? 'Unknown',
          BodyType: p.BodyType ?? '',
          CargoContent: p.CargoContent ?? '',
          CargoPackageType: p.CargoPackageType ?? '',
          ApproxWeight: p.ApproxWeight ?? '',
          DhalaLength: p.DhalaLength ?? '',
          Origin: p.PickupLocation ?? 'Unknown origin',
          Destination: p.DestinationLocation ?? 'Unknown destination',
          PickupLat: Number(p.PickupLat) || 0,
          PickupLng: Number(p.PickupLng) || 0,
          DeliveryLat: Number(p.DeliveryLat) || 0,
          DeliveryLng: Number(p.DeliveryLng) || 0,
          PickupDistanceKm: Number(p.PickupDistanceKm) || 0,
          DestinationDistanceKm: Number(p.DestinationDistanceKm) || 0,
          DistanceInKm:
            Number(p.DestinationDistanceKm) || Number(p.PickupDistanceKm) || 0,
          PostDate: p.PostDate,
          ExpectedAvailableTime: p.ExpectedAvailableTime,
          RemainingMinutes: p.RemainingMinutes,
          RemainingTimeFormatted: p.RemainingTimeFormatted,
          status: p.status ?? 'on hold',
          Amount: p.Amount ?? '0',
          VehicleImage: p.VehicleImage ?? null,
          ProductImage: p.ProductImage ?? null,
          Cargopackag_IMG: p.Cargopackag_IMG,
          Vehicle_IMG: p.Vehicle_IMG,
        })),
      }),
    }),
  }),
});

export const {
  useGetAddressByPinMutation,
  useGetDistrictQuery,
  useGetStateQuery,
  useGetTalukaQuery,
  useNearbyCustomersPostQuery,
} = locationApi;

export default locationApi;
