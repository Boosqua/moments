import { connect } from "react-redux";
import { fetchUtilImages } from "../../actions/image_actions";
import LandingPage from "./landing_page";
var mapStateToProps = function (state) {
    return {
        loggedIn: state.session.isAuthenticated,
        user: state.session.user,
        albums: Object.values(state.entities.albums),
        publicImages: state.utils.images.map(function (image) { return image.path; })
    };
};
var mapDispatchToProps = function (dispatch) { return ({
    fetchUtilImages: function () { return dispatch(fetchUtilImages()); },
}); };
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
