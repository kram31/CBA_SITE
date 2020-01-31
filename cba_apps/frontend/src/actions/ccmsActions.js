import {
    FETCHING,
    STOP_FETCHING,
    GET_SURVEYS,
    ACK_ENTRY,
    ADD_UPDATE,
    GET_COMMENTS,
    GET_CCMS
} from "./types";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const get_ccms_list = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/ccms/")
        .then(res => {
            dispatch({
                type: GET_CCMS,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err));
};

export const ack_entry = (id, data) => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(`/api/ccms/${id}/`, data)
        .then(res => {
            dispatch({
                type: ACK_ENTRY,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response);
        });

    dispatch({
        type: STOP_FETCHING
    });
};

export const getComments = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/comments/")
        .then(res => {
            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err));
};

export const add_update = data => dispatch => {
    console.log("add update");
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/comments/", data)
        .then(res => {
            dispatch({
                type: ADD_UPDATE,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response);
        });

    dispatch({
        type: STOP_FETCHING
    });
};

export const isFetching = () => dispatch => {
    dispatch({
        type: STOP_FETCHING
    });
};

export const getSurveys = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/surveys/")
        .then(res =>
            dispatch({
                type: GET_SURVEYS,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};
