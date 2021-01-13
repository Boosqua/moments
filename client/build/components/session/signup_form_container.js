import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import { SessionForm } from "./session_form";
const mapStateToProps = (state) => {
    return {
        signedIn: state.session.isSignedIn,
        errors: state.errors.session,
        type: "signup"
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        formType: (user) => dispatch(signup(user)),
        login: (user) => dispatch(login(user))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
