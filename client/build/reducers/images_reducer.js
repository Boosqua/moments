import { RECEIVE_IMAGES } from "../actions/image_actions";
export default function reducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_IMAGES:
            return Object.assign(Object.assign({}, state), action.images);
        default:
            return state;
    }
}
