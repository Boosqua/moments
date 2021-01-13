import { RECEIVE_UTIL_IMAGES } from "../actions/image_actions";
export default function reducer(state = [], action) {
    switch (action.type) {
        case RECEIVE_UTIL_IMAGES:
            return action.images;
        default:
            return state;
    }
}
