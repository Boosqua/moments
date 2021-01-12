import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer"
import images from "./images_reducer"
import albums from "./albums_reducer"

export const RootReducer = combineReducers({
  session,
  errors,
  images,
  albums
});

export type RootState = ReturnType<typeof RootReducer>
