import axios from "axios";

export const getContactInfo = async () => {
  return await axios.get("contact-info");
};
export const sendSupport = async (data) => {
  return await axios.post("send-support", data);
};
export const updateContactInfo = async (data) => {
  return await axios.put("contact-info/update", data);
};
