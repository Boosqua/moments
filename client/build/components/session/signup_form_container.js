import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import { SessionForm } from "./login_form";
var mapStateToProps = function (state) {
    return {
        signedIn: state.session.isSignedIn,
        errors: state.errors.session,
        type: "signup"
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        formType: function (user) { return dispatch(signup(user)); },
        login: function (user) { return dispatch(login(user)); }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
