import { connect } from "react-redux";
import Album from "./album";
import { uploadImages } from '../../actions/image_actions';
import { createAlbum, removeUtilAlbum, uploadCover } from '../../actions/album_actions';
const mSTP = (state) => ({
    user: state.session.user,
    albums: Object.values(state.entities.albums).filter((album) => {
        return album.ownerid === state.session.user.id;
    }),
    creating: state.utils.album
});
const mDTP = (dispatch) => ({
    upload: (images) => dispatch(uploadImages(images)),
    createAlbum: (album) => dispatch(createAlbum(album)),
    uploadCover: (image) => dispatch(uploadCover(image)),
    clearAlbum: () => dispatch(removeUtilAlbum())
});
export default connect(mSTP, mDTP)(Album);
