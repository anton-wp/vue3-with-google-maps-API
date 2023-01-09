import axios from "axios";

export const getCustomersList = async (params) => {
  return await axios.get("customers", { params });
};
export const getCustomerById = async (id) => {
  return await axios.get(`customers/${id}`);
};
export const putCustomerById = async (id, data) => {
  return await axios.put(`customers/${id}`, data);
};
export const getJobsByCustomerId = async (params, id) => {
  return await axios.get(`customer/${id}/jobs`, { params });
};
