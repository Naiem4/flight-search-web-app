/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from 'react-hook-form';

type ValidationError = {
  path: string;
  message: string;
};

export type BackendErrorResponse = {
  code?: number;
  data?: {
    code?: number;
    message?: string;
    error?: string;
    path?: string;
    timestamp?: string;
    data?: ValidationError[];
  };
};

export const handleBackendError = (
  error: BackendErrorResponse,
  setError: any,
  errorMessage: string = 'There is something wrong with your request.'
) => {
  const errData = error;
  if (error?.code === 422 && Array.isArray(errData?.data)) {
    errData.data.forEach(item => {
      setError(item.path as keyof FieldValues, {
        type: 'server',
        message: item.message,
      });
    });
  } else {
    return errData?.data?.message || errorMessage;
  }
};
