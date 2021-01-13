import * as APIUtil from "../util/image_util";
export var RECEIVE_IMAGES = "RECEIVE_IMAGES";
export var RECEIVE_UTIL_IMAGES = "RECEIVE_UTIL_IMAGES";
export var receiveImages = function (images) { return ({
    type: RECEIVE_IMAGES,
    images: images
}); };
export var receiveUtilImages = function (images) { return ({
    type: RECEIVE_UTIL_IMAGES,
    images: images
}); };
export var fetchUtilImages = function () { return function (dispatch) {
    return APIUtil.fetchRecentImages()
        .then(function (results) { return dispatch(receiveUtilImages(results.data)); });
}; };
export var uploadImages = function (images) { return function (dispatch) {
    return APIUtil.uploadImages(images).then(function (result) { return dispatch(receiveImages(result.data)); });
}; };
