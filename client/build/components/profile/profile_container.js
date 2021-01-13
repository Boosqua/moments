import { connect } from "react-redux";
import { logout } from '../../actions/session_actions';
import Profile from "./profile";
var mSTP = function (state) { return ({
    user: state.session.user
}); };
var mDTP = function (dispatch) { return ({
    logout: function () { return dispatch(logout()); }
}); };
export default connect(mSTP, mDTP)(Profile);
