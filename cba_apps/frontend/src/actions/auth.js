import axios from "axios";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

// check token and load user

export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });

    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response);
            dispatch({
                type: AUTH_ERROR
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
            console.log(err.response);
            dispatch({
                type: LOGIN_FAIL
            });
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
            dispatch({
                type: REGISTER_FAIL
            });
        });
};
