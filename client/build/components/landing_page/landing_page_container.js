import { connect } from "react-redux";
import { fetchUtilImages } from "../../actions/image_actions";
import LandingPage from "./landing_page";
const mapStateToProps = (state) => {
    return {
        loggedIn: state.session.isAuthenticated,
        user: state.session.user,
        albums: Object.values(state.entities.albums),
        publicImages: state.utils.images.map(image => image.path)
    };
};
const mapDispatchToProps = (dispatch) => ({
    fetchUtilImages: () => dispatch(fetchUtilImages()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
