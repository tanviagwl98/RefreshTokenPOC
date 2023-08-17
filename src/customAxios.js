import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import app from "./firebase";

const api = axios.create({
  baseURL: 'https://restcountries.com/v2',
});

api.interceptors.request.use(async (config) => {

  // debugger
  // console.log(config, "My config");

  return config;
});

api.interceptors.response.use(
  
  (response) => response,
  async (error) => {
    debugger
    const originalRequest = error.config;
    // console.log(originalRequest, "My error")
    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      try{
        originalRequest._retry = true;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          localStorage.setItem("accessToken", user.accessToken);
        })
        const token = localStorage.getItem("accessToken");
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
        } catch(error){
          console.log(error, "Error generated");
          return Promise.reject(error);
        }
    }

    return Promise.reject(error);
  }
);

// Get all countries
export const getCountries = () => {
  debugger
  return api.get('/all',{ headers:{
    'Authorization':"Bearer " + localStorage.getItem('accessToken')
  }});
};

export default api;