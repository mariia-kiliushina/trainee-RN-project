import {RootState} from './index';

export type ThunkConfig = {
  rejectValue: {
    error: string;
  };
  state: RootState;
};

type TFetchConfig = RequestInit & {
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: string | FormData | URLSearchParams | ArrayBuffer | Blob;
  headers?: Record<string, string>;
};

export const fetchWithErrorCatching = async (
  URL: string,
  fetchConfig?: TFetchConfig,
) => {
  try {
    const response = await fetch(URL, fetchConfig);
    if (!response.ok) {
      throw new Error('Connection error');
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};
