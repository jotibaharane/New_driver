// src/api/endpoints/auth.api.ts
import apiClient from '../base';
import {
  ApiResponse,
  LoginRequest,
  ValidateOtpRequest,
  ValidateOtpResponse,
} from '../types/auth.types';

export const login = async (payload: LoginRequest): Promise<ApiResponse> => {
  const response = await apiClient.post('/Driver_SendOtp', payload);
  return response.data;
};

export const verifyOTP = async (
  payload: ValidateOtpRequest,
): Promise<ValidateOtpResponse> => {
  const response = await apiClient.post(`/Driver_ValidateOtp`, payload);
  return response.data;
};
