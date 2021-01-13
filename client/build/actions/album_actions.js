import * as APIUtil from "../util/album_util";
export var RECEIVE_ALBUM = "RECEIVE_ALBUM";
export var RECEIVE_ALL_ALBUMS = "RECEIVE_ALL_ALBUMS";
export var REMOVE_ALBUM = "REMOVE_ALBUM";
export var receiveAlbum = function (album) { return ({
    type: RECEIVE_ALBUM,
    album: album
}); };
export var receiveAllAlbums = function (albums) { return ({
    type: RECEIVE_ALL_ALBUMS,
    albums: albums
}); };
export var removeUtilAlbum = function () { return ({
    type: REMOVE_ALBUM
}); };
export var createAlbum = function (album) { return function (dispatch) {
    return APIUtil.createAlbum(album).then(function (result) { return dispatch(receiveAlbum(result.data)); });
}; };
export var fetchAllAlbums = function (userId) { return function (dispatch) {
    return APIUtil.fetchAllAlbums(userId).then(function (result) { return dispatch(receiveAllAlbums(result.data)); });
}; };
export var uploadCover = function (image) { return function (dispatch) {
    return APIUtil.uploadCover(image).then(function (results) { return dispatch(receiveAlbum(results.data)); });
}; };
