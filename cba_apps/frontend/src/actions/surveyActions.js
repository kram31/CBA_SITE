import {
    GET_SURVEYS,
    ADD_SURVEY,
    DELETE_SURVEY,
    GET_SURVEY,
    REMOVE_SURVEY,
    GET_AGENT,
    GET_SKILLS,
    GET_DSAT_CODE1,
    GET_BB_DRIVER_CODE2,
    GET_BB_DRIVER_CODE3,
    GET_TEAMS,
    ADD_RCA
} from "./types";

import axios from "axios";

export const getSurveys = () => dispatch => {
    axios.get("/api/surveys/").then(res =>
        dispatch({
            type: GET_SURVEYS,
            payload: res.data
        })
    );
};

export const deleteSurvey = id => dispatch => {
    axios.delete(`/api/surveys/${id}`).then(res =>
        dispatch({
            type: DELETE_SURVEY,
            payload: id
        })
    );
};

export const addSurveysBulk = list_data => dispatch => {
    const post_reqs = list_data.map(data => {
        axios
            .post("/api/surveys/", data)
            .then(res =>
                dispatch({
                    type: ADD_SURVEY,
                    payload: res.data
                })
            )
            .catch(err => console.log(err));
    });
    Promise.all(post_reqs);
};

export const getSurvey = data => dispatch => {
    dispatch({
        type: GET_SURVEY,
        payload: data
    });
};

export const removeSurvey = () => dispatch => {
    dispatch({
        type: REMOVE_SURVEY,
        payload: {}
    });
};

export const getAgentDetails = lan_id => dispatch => {
    axios.get(`/api/agents/${lan_id}`).then(res =>
        dispatch({
            type: GET_AGENT,
            payload: res.data
        })
    );
};

export const getSkills = () => dispatch => {
    axios.get("/api/skills/").then(res =>
        dispatch({
            type: GET_SKILLS,
            payload: res.data
        })
    );
};

export const getDsatCode1 = () => dispatch => {
    axios.get("/api/dsat_code1/").then(res =>
        dispatch({
            type: GET_DSAT_CODE1,
            payload: res.data
        })
    );
};

export const getBBDriverCode2 = () => dispatch => {
    axios.get("/api/bb_driver_code2/").then(res =>
        dispatch({
            type: GET_BB_DRIVER_CODE2,
            payload: res.data
        })
    );
};

export const getBBDriverCode3 = () => dispatch => {
    axios.get("/api/bb_driver_code3/").then(res =>
        dispatch({
            type: GET_BB_DRIVER_CODE3,
            payload: res.data
        })
    );
};

export const getTeams = () => dispatch => {
    axios.get("/api/team/").then(res =>
        dispatch({
            type: GET_TEAMS,
            payload: res.data
        })
    );
};

export const addRCA = rcaData => dispatch => {
    axios.post("/api/rca/", rcaData).then(res =>
        dispatch({
            type: ADD_RCA,
            payload: res.data
        })
    );
};
