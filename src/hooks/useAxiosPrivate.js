import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

let axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosPrivate = () => {
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
          console.log("Request Interceptor:", config);
        }
        return config;
      },
      (error) => {
        console.log("Request Interceptor Error:", error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log("Response Interceptor:", response);
        return response;
      },
      (error) => {
        console.log("Response Interceptor Error:", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
