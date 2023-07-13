import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  null,
  (error: AxiosError) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.error(error);
      toast.error('An unexpected error occurred!');
    }

    return Promise.reject(error);
  }
);

const setJwt = (jwt: string): void => {
  axios.defaults.headers.common['x-auth-token'] = jwt;
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};


export default http;