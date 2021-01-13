import { combineReducers } from "redux";
import images from "./images_reducer";
import albums from "./albums_reducer";
export default combineReducers({
    images,
    albums
});
