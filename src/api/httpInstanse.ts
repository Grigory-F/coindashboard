import axios from "axios";

export const httpInstance = axios.create({
    baseURL: 'https://api.coincap.io',
    headers: {
    },
  });