import { GET_MAILS, FETCHING, STOP_FETCHING, GET_SURVEYS } from "./types";

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
