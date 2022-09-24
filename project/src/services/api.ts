import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy/ff';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        toast.warn(error.response.statusText);
      }

      throw error;
    }
  );

  return api;
};
