import apiClient from '@api/client/axios.client';
import {
  ApiResponse,
  LoginRequest,
  OtpValidationResponse,
  ValidateOtpRequest,
} from './auth.types';

export const login = (payload: LoginRequest): Promise<ApiResponse> =>
  apiClient.post('/Driver_SendOtp', payload).then(r => r.data);

export const verifyOTP = (
  payload: ValidateOtpRequest,
): Promise<OtpValidationResponse> =>
  apiClient.post('/Driver_ValidateOtp', payload).then(r => r.data);
