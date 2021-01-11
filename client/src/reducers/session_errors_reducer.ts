
import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
} from "../actions/session_actions";

const _nullErrors: string[] = [];

const SessionErrorsReducer = (state: string[] = _nullErrors, action: { type: string, errors: string[] } ) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
