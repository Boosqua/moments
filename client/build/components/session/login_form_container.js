import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import { SessionForm } from "./login_form";
var mapStateToProps = function (state) {
    return {
        errors: state.errors.session,
        type: "login"
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        formType: function (user) { return dispatch(login(user)); },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
