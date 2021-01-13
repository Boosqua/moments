import { REMOVE_ALBUM, RECEIVE_ALBUM } from '../actions/album_actions';
export default function reducer(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case RECEIVE_ALBUM:
            return action.album;
        case REMOVE_ALBUM:
            return {};
        default:
            return state;
    }
}
