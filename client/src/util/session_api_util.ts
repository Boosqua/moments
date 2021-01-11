import axios from "axios";
interface user{username:string, password:string}
export const setAuthToken = (token:boolean) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = (userData:user) => {
  return axios.post("/api/users", userData);
};

export const login = (userData:user) => {
  return axios.post("/api/users/login", userData);
};

