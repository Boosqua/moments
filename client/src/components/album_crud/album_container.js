import { connect } from "react-redux";
import Album from "./album"
import { uploadImages} from '../../actions/image_actions'
import { createAlbum } from '../../actions/album_actions'
const mSTP = (state) => ({
   user: state.session.user,
   albums: state.entities.albums,
   creating: state.utils.album
})

const mDTP = (dispatch) => ({
   upload: (images) => dispatch(uploadImages(images)),
   createAlbum: (album) => dispatch(createAlbum(album))
})

export default connect(mSTP, mDTP)(Album)