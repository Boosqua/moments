import {connect} from "react-redux"
import { logout} from '../../actions/session_actions'
import Profile from "./profile"
const mSTP = (state) => ({
   user: state.session.user
})

const mDTP = (dispatch) => ({
   logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(Profile)