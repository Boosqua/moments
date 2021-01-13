import * as APIUtil from "../util/image_util";
export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_UTIL_IMAGES = "RECEIVE_UTIL_IMAGES";
export const receiveImages = (images) => ({
    type: RECEIVE_IMAGES,
    images: images
});
export const receiveUtilImages = (images) => ({
    type: RECEIVE_UTIL_IMAGES,
    images: images
});
export const fetchUtilImages = () => (dispatch) => APIUtil.fetchRecentImages()
    .then((results) => dispatch(receiveUtilImages(results.data)));
export const uploadImages = (images) => (dispatch) => APIUtil.uploadImages(images).then((result) => dispatch(receiveImages(result.data)));
