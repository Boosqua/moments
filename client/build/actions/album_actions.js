import * as APIUtil from "../util/album_util";
export const RECEIVE_ALBUM = "RECEIVE_ALBUM";
export const RECEIVE_ALL_ALBUMS = "RECEIVE_ALL_ALBUMS";
export const REMOVE_ALBUM = "REMOVE_ALBUM";
export const receiveAlbum = (album) => ({
    type: RECEIVE_ALBUM,
    album: album
});
export const receiveAllAlbums = (albums) => ({
    type: RECEIVE_ALL_ALBUMS,
    albums: albums
});
export const removeUtilAlbum = () => ({
    type: REMOVE_ALBUM
});
export const createAlbum = (album) => (dispatch) => APIUtil.createAlbum(album).then((result) => dispatch(receiveAlbum(result.data)));
export const fetchAllAlbums = (userId) => (dispatch) => APIUtil.fetchAllAlbums(userId).then((result) => dispatch(receiveAllAlbums(result.data)));
export const uploadCover = (image) => (dispatch) => APIUtil.uploadCover(image).then((results) => dispatch(receiveAlbum(results.data)));
