import { Reducer } from "redux";

import { User } from "../../types"
import { GET_USERS_FAILED, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_BY_ID_FAILED, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "../actionTypes";

type GETUSERS_ACTIONTYPE =
  | { type: typeof GET_USERS_REQUEST }
  | { type: typeof GET_USERS_SUCCESS; payload: User[] }
  | { type: typeof GET_USERS_FAILED; payload: any };

interface GetUsersInitialState {
  loading: boolean;
  success: boolean;
  users: User[];
  error: any;
}

export const getUsersReducer: Reducer = (
  state: GetUsersInitialState = {
    loading: false,
    success: false,
    users: [],
    error: null
  },
  action: GETUSERS_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        success: true,
        users: action.payload,
      };
    case GET_USERS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

type GETUSERBYID_ACTIONTYPE =
  | { type: typeof GET_USER_BY_ID_REQUEST }
  | { type: typeof GET_USER_BY_ID_SUCCESS; payload: User[] }
  | { type: typeof GET_USER_BY_ID_FAILED; payload: any };

interface GetUserByIdInitialState {
  loading: boolean;
  success: boolean;
  user: User;
  error: any;
}

export const getUserByIdReducer: Reducer = (
  state: GetUserByIdInitialState = {
    loading: false,
    success: false,
    user: {
      id: "",
      username: "",
      createdAt: new Date().toLocaleString(),
    },
    error: null
  },
  action: GETUSERBYID_ACTIONTYPE
) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
      return { loading: true };
    case GET_USER_BY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case GET_USER_BY_ID_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

