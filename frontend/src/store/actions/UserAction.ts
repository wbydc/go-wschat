import axios from "axios";
import { Dispatch } from "redux";

import { UUID } from "../../types";
import { API_URL } from "../../constants"
import { GET_PROFILE_FAILED, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_USER_BY_ID_FAILED, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "../actionTypes";
import { GetStateFn } from "../store";

export const getProfile =
  () => async (dispatch: Dispatch, getState: GetStateFn) => {
    try {
      dispatch({
        type: GET_PROFILE_REQUEST,
      });

      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "X-Auth-Token": userInfo.token,
        },
      };
      const { data } = await axios.get(`${API_URL}/user/me`, config);
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_PROFILE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

export const getUserById =
  (userId: UUID) => async (dispatch: Dispatch, getState: GetStateFn) => {
    try {
      dispatch({
        type: GET_USER_BY_ID_REQUEST,
      });

      const {
        auth: { userInfo },
      } = getState();
      const config = {
        headers: {
          "X-Auth-Token": userInfo.token,
        },
      };
      const { data } = await axios.get(`${API_URL}/user/${userId}`, config);
      dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USER_BY_ID_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
