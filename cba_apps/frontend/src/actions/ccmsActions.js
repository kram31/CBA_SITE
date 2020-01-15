import {
    GET_MAILS,
    FETCHING,
    STOP_FETCHING,
    GET_SURVEYS,
    ACK_ENTRY,
    ADD_UPDATE,
    GET_COMMENTS
} from "./types";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8282";

export const getMails = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("http://localhost:8282/api/mails/")
        .then(res => {
            dispatch({
                type: GET_MAILS,
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
        .put(`http://localhost:8282/api/mails/${id}/`, data)
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
        .get("http://localhost:8282/api/comments/")
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
    dispatch({
        type: FETCHING
    });

    axios
        .post(`http://localhost:8282/api/comments/`, data)
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
