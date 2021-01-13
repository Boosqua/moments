import axios from "axios";
export var setAuthToken = function (token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
export var signup = function (userData) {
    return axios.post("/api/users", userData);
};
export var login = function (userData) {
    return axios.post("/api/users/login", userData);
};
