import apiService from "./ApiService";
import { Credentials, UserInfo } from "../types";

class AuthService {
  async login(credentials: Credentials): Promise<UserInfo> {
    const { data } = await apiService.api.post<UserInfo>(
      `/auth/login`,
      credentials,
    );

    apiService.setAuthToken(data.token);
    localStorage.setItem("userInfo", JSON.stringify(data));

    return data;
  }

  async signup(credentials: Credentials): Promise<void> {
    const { status, statusText } = await apiService.api.post(
      `/auth/register`,
      credentials,
    );
    
    if (status !== 200) {
      throw new Error(statusText);
    }
  }

  async logout(): Promise<void> {
    apiService.setAuthToken();
    localStorage.removeItem("userInfo");
  }
}

export default new AuthService();
