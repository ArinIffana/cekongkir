import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: process.env.REACT_APP_BACK_END2,
});
axiosApiIntances.interceptors.request.use(
  function (config) {
    config.headers = {
      key: `${process.env.REACT_APP_RAJAONGKIR}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/x-www-form-urlencoded",
      // "Access-Control-Expose-Headers":
      //   "Origin, Content-Type, X-Auth-Token, Content-Length, X-JSON",
      // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    };
    console.log(config);
    return config;
  },
  function (request) {
    request.withCredentials = true;
    return request;
  },
  function (error) {
    if (error.response.status === 403) {
    }
    if (error.response.status === 403) {
      if (error.response.data.msg !== "jwt expired") {
        localStorage.clear();
        window.location.href = "/signin";
      } else if (error.response.data.msg === "jwt expired") {
        const refreshToken = localStorage.getItem("refreshToken");
        axiosApiIntances
          .post("auth/refresh", { refreshToken })
          .then((res) => {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            localStorage.clear();
            window.location.href = "/signin";
          });
      }
    }
    return Promise.reject(error);
  }
);

axiosApiIntances.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosApiIntances;
