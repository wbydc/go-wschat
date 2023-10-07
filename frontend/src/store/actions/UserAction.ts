import { Dispatch } from "redux";

import { UUID } from "../../types";
import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USERS_FAILED,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USER_BY_ID_FAILED,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS
} from "../actionTypes";
import userService from "../../service/UserService";

export const getProfile =
  () => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: GET_PROFILE_REQUEST,
      });

      const data = await userService.getProfile();

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

export const getUsers =
  () => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: GET_USERS_REQUEST,
      });

      const data = await userService.getUsers();

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_USERS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }

export const getUserById =
  (userId: UUID) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: GET_USER_BY_ID_REQUEST,
      });

      const data = await userService.getUserById(userId);

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
