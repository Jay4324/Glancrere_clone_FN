import { Error } from "@mui/icons-material";
import axios from "axios";
const url = import.meta.env.VITE_BACK_END_URL;
console.log(url);
const jsconfig = {
  withCredentials: true,
};

export const userRegister = async (data) => {
  try {
    console.log("register url is", `${url}/register`);
    const res = await axios.post(`${url}/register`, data, jsconfig);
    return res;
  } catch (err) {
    throw err;
  }
};
export const userLogin = async (data) => {
  try {
    const res = await axios.post(`${url}/login`, data, jsconfig);
    return res;
  } catch (err) {
    throw err;
  }
};
export const userProfile = () => {
  try {
    let res = axios.get(`${url}/userProfile`, jsconfig);
    return res;
  } catch (err) {
    throw err;
  }
};
export const userLogout = () => {
  try {
    let res = axios.delete(`${url}/userLogout`, jsconfig);
    return res;
  } catch (err) {
    throw err;
  }
};
