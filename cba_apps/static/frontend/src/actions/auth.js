import axios from "axios";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_ERRORS
} from "./types";

// check token and load user

// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://localhost:443";

export const loadUser = () => dispatch => {
    // user loading
    dispatch({ type: USER_LOADING });

    axios.get("/api/cba_auth").then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    });
};

// login user

export const login = (username, password) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    // request body
    const body = JSON.stringify({ username, password });

    axios
        .post("/api/auth/login", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            let errors;

            if (err) {
                if (err.response.data.non_field_errors[0]) {
                    errors = {
                        msg: err.response.data.non_field_errors[0],
                        status: err.response.status
                    };
                    dispatch({
                        type: GET_ERRORS,
                        payload: errors
                    });
                    dispatch({
                        type: LOGIN_FAIL
                    });
                }
            }
        });
};

// LOGOUT USER

export const logout = () => (dispatch, getState) => {
    axios
        .post("/api/auth/logout", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response);
        });
};

export const tokenConfig = getState => {
    // get token from state
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    // if token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};

// register user

export const register = ({ username, password, email }) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    // request body
    const body = JSON.stringify({ username, password, email });

    axios
        .post("/api/auth/register", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response);
            const errors = {
                msg: err.response.data,
                status: err.response.status
            };
            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
            dispatch({
                type: REGISTER_FAIL
            });
        });
};
