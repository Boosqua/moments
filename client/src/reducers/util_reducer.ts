import album from "./albums_util_reducer"
import images from "./images_util_reducer"
import { combineReducers } from "redux";
export default combineReducers({
   album: album,
   images: images
})