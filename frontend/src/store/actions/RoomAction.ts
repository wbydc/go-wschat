import axios from "axios";
import { Dispatch } from "redux";

import { UUID } from "../../types";
import { API_URL } from "../../constants"
import { GET_ROOMS_FAILED, GET_ROOMS_REQUEST, GET_ROOMS_SUCCESS, GET_ROOM_BY_ID_FAILED, GET_ROOM_BY_ID_REQUEST, GET_ROOM_BY_ID_SUCCESS } from "../actionTypes";
import { GetStateFn } from "../store";

export const getRooms =
  () => async (dispatch: Dispatch, getState: GetStateFn) => {
    try {
      dispatch({
        type: GET_ROOMS_REQUEST,
      });

      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "X-Auth-Token": userInfo.token,
        },
      };
      const { data } = await axios.get(`${API_URL}/room/all`, config);
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
  (userId: UUID) => async (dispatch: Dispatch, getState: GetStateFn) => {
    try {
      dispatch({
        type: GET_ROOM_BY_ID_REQUEST,
      });

      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "X-Auth-Token": userInfo.token,
        },
      };
      const { data } = await axios.get(`${API_URL}/room/${userId}`, config);
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
