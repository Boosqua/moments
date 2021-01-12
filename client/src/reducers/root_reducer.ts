import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer"
import entities from "./entities_reducer"
import utils from "./util_reducer"

export const RootReducer = combineReducers({
  session,
  errors,
  entities,
  utils
});

export type RootState = ReturnType<typeof RootReducer>
