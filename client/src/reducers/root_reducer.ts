// src/reducers/root_reducer.js

import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer"

export const RootReducer = combineReducers({
  session,
  errors,
});

export type RootState = ReturnType<typeof RootReducer>
