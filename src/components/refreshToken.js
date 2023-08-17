import axios from "axios";

// const api = axios.create({
//   baseURL: 'https://restcountries.com/v2',
// });
const customAxios = axios.create();
let isRefreshing = false;
let refreshSubscribers = [];
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // console.log(originalRequest, "My error")
    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          originalRequest._retry = true;
          const res = await customAxios.post(
            "https://",
            {
              username: JSON.parse(localStorage.getItem("Udata")).userName,
              ipAddress: "40.83.171.213",
              password: "Today@12",
            },
            {
              headers: {
                ST: "PL",
              },
            }
          );
          const data = res.data.data;
          data.username = JSON.parse(localStorage.getItem("APUData")).userName;
          localStorage.setItem("APUData", JSON.stringify(data));
          localStorage.setItem("APaccessToken", data.accessToken);
          originalRequest.headers.Authorization = "Bearer " + data.accessToken;
          refreshSubscribers.forEach((subscriber) => subscriber(data.accessToken));
          refreshSubscribers = [];
          isRefreshing = false;
          return customAxios(originalRequest);
        } catch (err) {
            isRefreshing = false;
            refreshSubscribers = [];
            return Promise.reject(error);
        }
      }
      else{
        return new Promise((resolve)=>{
            refreshSubscribers.push((accessToken)=>{
                originalRequest.headers.Authorization = 'Bearer ' + accessToken;
                resolve(customAxios(originalRequest));
            })
        })
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
