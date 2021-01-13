var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { RECEIVE_IMAGES } from "../actions/image_actions";
export default function (state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case RECEIVE_IMAGES:
            return __assign(__assign({}, state), action.images);
        default:
            return state;
    }
}
