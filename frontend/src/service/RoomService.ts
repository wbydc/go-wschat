import apiService from "./ApiService";
import { UUID, Room } from "../types";

class RoomService {
  async create(title: string, password: string | null) {
    const { data } = await apiService.api.post<Room>(`/room`, { title, password });
    return data;
  }

  async getRooms(): Promise<Room[]> {
    const { data } = await apiService.api.get<Room[]>(`/room/all`);
    return data;
  }

  async getRoomById(roomId: UUID): Promise<Room> {
    const { data } = await apiService.api.get<Room>(`/room/${roomId}`);
    return data;
  }
}

export default new RoomService();
