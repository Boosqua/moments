import { connect } from "react-redux";

import LandingPage from "./landing_page";

const mapStateToProps = (state, ownProps) => {
  return { loggedIn: state.session.isAuthenticated };
};

export default connect(mapStateToProps, null)(LandingPage);
