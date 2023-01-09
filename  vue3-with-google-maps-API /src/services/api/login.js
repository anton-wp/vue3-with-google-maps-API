import axios from "axios";

export const login = async (data) => {
  return await axios.post("login", data);
};
export const loginByIdAndHash = async (hash, id) => {
  return await axios.get(`google/login/${id}/${hash}`);
};
export const register = async (data) => {
  return await axios.post("register", data);
};
export const logout = async () => {
  return await axios.post("logout");
};
export const verifyEmail = async (hash, id) => {
  return await axios.get(`email/verify/${id}/${hash} `);
};
export const forgotPassword = async (data) => {
  return await axios.post("forgot-password", data);
};
export const checkCode = async (data) => {
  return await axios.post("check-code", data);
};
export const resetPassword = async (data) => {
  return await axios.post("reset-password", data);
};
export const resendEmail = async (token) => {
  return await axios.post(
    "email/verify/send",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const resendEmailWithVerification = async () => {
  return await axios.post("email/verify/send", {});
};
