import axios from "axios";
import { Dispatch } from "redux";

import { UserInfo } from "../../types";
import { API_URL } from "../../constants"
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actionTypes";

interface Credentials {
  username: string;
  password: string;
}

export const login =
  (credentials: Credentials) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post<UserInfo>(
        `${API_URL}/auth/login`,
        credentials,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      // set token
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const register =
  (credentials: Credentials) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        `${API_URL}/auth/register`,
        credentials,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: REGISTER_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout =
  () => async (dispatch: Dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
      type: LOGOUT,
    });
  };
