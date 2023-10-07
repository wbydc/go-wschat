import { Dispatch } from "redux";

import authService from "../../service/AuthService";
import { Credentials, UserInfo } from "../../types";
import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actionTypes";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const login =
  (credentials: Credentials) =>
  async (dispatch: Dispatch) => {
    try {
      console.log("login action", credentials);
      
      dispatch({
        type: LOGIN_REQUEST,
      });

      const data: UserInfo = await authService.login(credentials);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });

      const { setUserInContext } = useContext(AuthContext);

      setUserInContext(data);
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
  (credentials: Credentials) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      
      await authService.signup(credentials);

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
    await authService.logout();

    dispatch({
      type: LOGOUT,
    });
  };
