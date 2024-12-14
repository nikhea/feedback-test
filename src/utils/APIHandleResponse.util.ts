/* eslint-disable @typescript-eslint/no-explicit-any */
export interface APIResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
  errors?: any[];
}

export const createResponse = (
  success: boolean,
  statusCode: number,
  message: string,
  data?: any,
  errors?: any[]
): APIResponse => ({
  success,
  statusCode,
  message,
  ...(data && { data }),
  ...(errors && { errors }),
});

export const handleAPIResponse = (
  success: boolean,
  statusCode: number,
  message: string,
  data?: any,
  errors?: any[]
): APIResponse => createResponse(success, statusCode, message, data, errors);
