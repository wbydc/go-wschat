import { Reducer } from "redux";

import { Room } from "../../types"
import { GET_ROOMS_FAILED, GET_ROOMS_REQUEST, GET_ROOMS_SUCCESS, GET_ROOM_BY_ID_FAILED, GET_ROOM_BY_ID_REQUEST, GET_ROOM_BY_ID_SUCCESS } from "../actionTypes";

type GETROOMS_ACTIONTYPE =
  | { type: typeof GET_ROOMS_REQUEST }
  | { type: typeof GET_ROOMS_SUCCESS; payload: Room[] }
  | { type: typeof GET_ROOMS_FAILED; payload: any };

interface GetRoomsInitialState {
  loading: boolean;
  success: boolean;
  rooms: Room[];
  error: any;
}

export const getRoomsReducer: Reducer = (
  state: GetRoomsInitialState = {
    loading: false,
    success: false,
    rooms: [],
    error: null
  },
  action: GETROOMS_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_ROOMS_REQUEST:
      return { loading: true };
    case GET_ROOMS_SUCCESS:
      return {
        loading: false,
        success: true,
        rooms: action.payload,
      };
    case GET_ROOMS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

type GETROOMBYID_ACTIONTYPE =
  | { type: typeof GET_ROOM_BY_ID_REQUEST }
  | { type: typeof GET_ROOM_BY_ID_SUCCESS; payload: Room[] }
  | { type: typeof GET_ROOM_BY_ID_FAILED; payload: any };

interface GetRoomByIdInitialState {
  loading: boolean;
  success: boolean;
  room: Room;
  error: any;
}

export const getRoomByIdReducer: Reducer = (
  state: GetRoomByIdInitialState = {
    loading: false,
    success: false,
    room: {
      id: "",
      userId: "",
      title: "",
      createdAt: new Date(),
    },
    error: null
  },
  action: GETROOMBYID_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_ROOM_BY_ID_REQUEST:
      return { loading: true };
    case GET_ROOM_BY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        room: action.payload,
      };
    case GET_ROOM_BY_ID_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

