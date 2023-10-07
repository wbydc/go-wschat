import axios from "axios";
import { Dispatch } from "redux";

import { UUID } from "../../types";
import {
  GET_ROOMS_FAILED,
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOM_BY_ID_FAILED,
  GET_ROOM_BY_ID_REQUEST,
  GET_ROOM_BY_ID_SUCCESS
} from "../actionTypes";
import roomService from "../../service/RoomService";

export const getRooms =
  () => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: GET_ROOMS_REQUEST,
      });

      const data = await roomService.getRooms();

      dispatch({
        type: GET_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_ROOMS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

export const getRoomById =
  (roomId: UUID) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: GET_ROOM_BY_ID_REQUEST,
      });

      const data = await roomService.getRoomById(roomId);

      dispatch({
        type: GET_ROOM_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_ROOM_BY_ID_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
