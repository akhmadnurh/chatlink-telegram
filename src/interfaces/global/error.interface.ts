export interface IGlobalErrorResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}
