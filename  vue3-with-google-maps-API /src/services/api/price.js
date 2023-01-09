import axios from "axios";

export const getPrice = async () => {
  return await axios.get("coating-prices");
};
export const deletePrice = async (userRequest) => {
  return await axios.delete(`user-requests/${userRequest}`);
};
export const updatePrice = async (data) => {
  return await axios.put("coating-prices", { coatings: data });
};
export const createPrice = async (data, user_id) => {
  return await axios.post("user-requests", {
    coatings: data,
    user_id
  });
};
export const getPriceById = async (params) => {
  return await axios.get("user-requests", { params });
};
