import axios from "axios";

const endpoint =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : "https://kataku-backend.herokuapp.com/";

const instance = axios.create({
  baseURL: endpoint,
});

instance.interceptors.request.use(function (req) {
  const token = localStorage.getItem("kataku_token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
    return req;
  }

  return req;
});

export default instance;
