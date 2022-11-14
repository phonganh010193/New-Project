import axios from 'axios';
import qs from 'qs';

export const httpClient = axios.create({
  baseURL: `https://repres.in/api/`,
  headers: {
    'Content-Type': 'application/json'
  },
//   paramsSerializer?: (params) => qs.stringify(params)
});
