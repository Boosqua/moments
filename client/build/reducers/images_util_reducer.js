import { RECEIVE_UTIL_IMAGES } from "../actions/image_actions";
export default function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case RECEIVE_UTIL_IMAGES:
            return action.images;
        default:
            return state;
    }
}
