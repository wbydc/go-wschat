import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import jwtDecode, { JwtPayload } from "jwt-decode";

import { User, Room, Message, UserInfo } from "../types";
import {
  loginReducer,
  registerReducer,
} from "./reducers/AuthReducer";
import {
  getUserByIdReducer,
  getUsersReducer,
} from "./reducers/UserReducer";
import {
  getRoomByIdReducer,
  getRoomsReducer,
} from "./reducers/RoomReducer";

const reducer = combineReducers({
  auth: loginReducer,
  register: registerReducer,
  getUserById: getUserByIdReducer,
  getUsers: getUsersReducer,
  getRoomById: getRoomByIdReducer,
  getRooms: getRoomsReducer,
});

const verifyToken = (token: string, lsItem: string): boolean => {
  const currentDate = new Date();
  const { exp } = jwtDecode<JwtPayload>(token);
  if (exp) {
    if (currentDate.getTime() > exp * 1000) {
      localStorage.removeItem(lsItem);
      return false;
    }
  }
  return true;
};

export interface StateStore {
  auth: {
    isAuthenticated: boolean;
    userInfo: UserInfo;
  };
  users: User[];
  rooms: Room[];
  messages: Message[];
}

const preloadedState: StateStore = {
  auth: {
    isAuthenticated: localStorage.getItem("userInfo")
      ? verifyToken(
          JSON.parse(localStorage.getItem("userInfo") as string).token,
          "userInfo"
        )
      : false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") as string)
      : {},
  },
  users: [] as User[],
  rooms: [] as Room[],
  messages: [] as Message[],
};

export const store = configureStore({
  reducer,
  preloadedState,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type GetStateFn = () => StateStore
