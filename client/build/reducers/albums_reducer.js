import { RECEIVE_ALBUM, RECEIVE_ALL_ALBUMS } from "../actions/album_actions";
export default function (state, action) {
    var _a;
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case RECEIVE_ALL_ALBUMS:
            return action.albums;
        case RECEIVE_ALBUM:
            var id = action.album.id;
            var newAlbum = (_a = {}, _a[id] = action.album, _a);
            return Object.assign({}, state, newAlbum);
        default:
            return state;
    }
}
