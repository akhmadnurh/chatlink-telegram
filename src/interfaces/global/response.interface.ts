export interface IGlobalResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}
