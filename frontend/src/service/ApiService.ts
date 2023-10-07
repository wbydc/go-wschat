import axios, { AxiosInstance } from "axios";

import { API_URL } from "../constants";

class ApiService {
  public readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
    });
    
    this.api.defaults.headers.common["Content-Type"] = "application/json";
  }

  setAuthToken(token?: string) {
    if (token) {
      this.api.defaults.headers.common["X-Auth-Token"] = token;
    } else {
      delete this.api.defaults.headers.common["X-Auth-Token"];
    }
  }
}

export default new ApiService();
