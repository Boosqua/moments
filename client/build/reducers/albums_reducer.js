import { RECEIVE_ALBUM, RECEIVE_ALL_ALBUMS } from "../actions/album_actions";
export default function reducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ALL_ALBUMS:
            return action.albums;
        case RECEIVE_ALBUM:
            let id = action.album.id;
            let newAlbum = { [id]: action.album };
            return Object.assign({}, state, newAlbum);
        default:
            return state;
    }
}
