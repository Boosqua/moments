import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { RootReducer } from "../reducers/root_reducer";
var configureStore = function (preloadedState) {
    if (preloadedState === void 0) { preloadedState = {}; }
    return createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger));
};
export default configureStore;
