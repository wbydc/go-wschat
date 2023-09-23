import { create } from "zustand";

interface StateStore {
  users: [];
  rooms: [];
  messages: [];
}

export const useStore = create<StateStore>((set) => ({
  users: [],
  rooms: [],
  messages: [],
}));
