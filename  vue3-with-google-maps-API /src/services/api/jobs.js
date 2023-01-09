import axios from "axios";

export const getJobsList = async (params) => {
  return await axios.get("jobs", { params });
};
export const getJobsById = async ({ jobId }) => {
  return await axios.get(`jobs/${jobId}`);
};
export const getJobMetaData = async ({ jobId }) => {
  return await axios.get(`job-meta-data/${jobId}`);
};
export const getRoofDetail = async ({ jobId, roofDetailId }) => {
  return await axios.get(`jobs/${jobId}/roof-details/${roofDetailId}`);
};
export const getRoofDetails = async ({ jobId }) => {
  return await axios.get(`jobs/${jobId}/roof-details`);
};
export const saveJobs = async (data) => {
  return await axios.post("jobs", data);
};
export const updateJobs = async ({ jobId, data }) => {
  return await axios.post(`jobs/${jobId}`, { ...data, _method: "PUT" });
};
export const saveJobImage = async ({ jobId, data }) => {
  return await axios.post(`jobs/${jobId}/images`, data);
};
export const changeStatusJob = async ({ jobId, data }) => {
  return await axios.put(`jobs/${jobId}/status`, data);
};
export const deleteJobImage = async ({ jobId, image }) => {
  return await axios.delete(`jobs/${jobId}/images/${image}`);
};
export const deleteJobById = async (jobId, params) => {
  return await axios.delete(`jobs/${jobId}`, { params });
};
