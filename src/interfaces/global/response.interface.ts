export interface IGlobalResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

export interface IAiGlobalResponse {
  status: boolean;
  message: string;
}
