import { connect } from "react-redux";
import { fetchAllAlbums } from "../../actions/album_actions";
import { logout } from "../../actions/session_actions";
import NavBar from "./navbar";
var mapStateToProps = function (state, ownProps) {
    return { loggedIn: state.session.isAuthenticated, user: state.session.user };
};
var mapDispatchToProps = function (dispatch) { return ({
    logout: function () { return dispatch(logout()); },
    fetchAllAlbums: function (userId) { return dispatch(fetchAllAlbums(userId)); }
}); };
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
