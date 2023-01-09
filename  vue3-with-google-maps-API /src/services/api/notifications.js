import axios from "axios";

export const getNotificationsList = async (params) => {
  return await axios.get("notifications", { params });
};
export const getNotificationsUnreadList = async () => {
  return await axios.get("notifications?unread=true");
};
export const putReadNotif = async (notificationId) => {
  return await axios.put(`notifications/${notificationId}`);
};
