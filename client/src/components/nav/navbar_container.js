import { connect } from "react-redux";
import { fetchAllAlbums } from "../../actions/album_actions";
import { logout } from "../../actions/session_actions";

import NavBar from "./navbar";

const mapStateToProps = (state, ownProps) => {
   return {loggedIn: state.session.isAuthenticated, user: state.session.user }
};
const mapDispatchToProps = (dispatch) => ({
   logout: () => dispatch(logout()),
   fetchAllAlbums: (userId) => dispatch(fetchAllAlbums(userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
