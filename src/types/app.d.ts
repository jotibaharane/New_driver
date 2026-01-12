export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
