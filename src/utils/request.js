import axiosInstance from './axiosIns';

export async function get (url, params) {
  const response = await axiosInstance.get(url, { params });
  return response.data;
}

export async function post (url, data) {
  const response = await axiosInstance.post(url, data);
  return response.data;
}
