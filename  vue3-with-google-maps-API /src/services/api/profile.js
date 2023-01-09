import axios from "axios";
import { useAuthStore } from "@/stores";

export const getProfile = async () => {
  return await axios.get("profile");
};
export const updateProfile = async (data) => {
  return await axios.put("profile", data);
};
export const deleteProfile = async () => {
  await axios.delete("profile");
  useAuthStore().deleteUser();
};
export const resetPassword = async (data) => {
  return await axios.post("update-password", data);
};
export const saveAvatar = async (data) => {
  return await axios.post("avatar", data);
};
export const deleteAvatar = async () => {
  return await axios.delete("avatar");
};
