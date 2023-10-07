import apiService from "./ApiService";
import { UUID, User } from "../types";

class UserService {
  async getProfile(): Promise<User> {
    const { data } = await apiService.api.get<User>(`/user/me`);
    return data;
  }

  async getUsers(): Promise<User> {
    const { data } = await apiService.api.get<User>(`/user/all`);
    return data;
  }

  async getUserById(userId: UUID): Promise<User> {
    const { data } = await apiService.api.get<User>(`/user/${userId}`);
    return data;
  }
}

export default new UserService();
