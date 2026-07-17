import axios from "axios";

export const api = axios.create({
  baseURL: "https://sandbox.brainsoftsistemas.com.br/api",
});
