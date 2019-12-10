import { GET_MAILS, FETCHING, STOP_FETCHING, GET_SURVEYS } from "./types";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const getMails = mails => dispatch => {
    dispatch({
        type: GET_MAILS,
        payload: mails
    });
    // dispatch({});
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
