import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNiMDgyMGQ5OTRjNGVkNGRlMDc5ZGMiLCJpYXQiOjE2NDA2OTU5MzF9.PuQoFGPI2CnnYz560Z6bDIap1BaCMxj-SxFRYXGtgU4";
const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "x-auth-token": token },
});

export default instance;
