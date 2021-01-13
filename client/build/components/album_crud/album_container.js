import { connect } from "react-redux";
import Album from "./album";
import { uploadImages } from '../../actions/image_actions';
import { createAlbum, removeUtilAlbum, uploadCover } from '../../actions/album_actions';
var mSTP = function (state) { return ({
    user: state.session.user,
    albums: Object.values(state.entities.albums).filter(function (album) {
        return album.ownerid === state.session.user.id;
    }),
    creating: state.utils.album
}); };
var mDTP = function (dispatch) { return ({
    upload: function (images) { return dispatch(uploadImages(images)); },
    createAlbum: function (album) { return dispatch(createAlbum(album)); },
    uploadCover: function (image) { return dispatch(uploadCover(image)); },
    clearAlbum: function () { return dispatch(removeUtilAlbum()); }
}); };
export default connect(mSTP, mDTP)(Album);
