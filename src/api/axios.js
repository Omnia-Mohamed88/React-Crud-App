import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Accept: "application/json" },
});

export const axiosPrivateFile = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});
