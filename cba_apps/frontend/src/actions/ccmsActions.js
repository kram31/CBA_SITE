import {
    FETCHING,
    STOP_FETCHING,
    GET_SURVEYS,
    ACK_ENTRY,
    ADD_UPDATE,
    GET_COMMENTS,
    GET_CCMS,
    GET_BUSINESS_UNIT,
    GET_TICKET_STATUS,
    GET_ESCALATION_TYPE,
    GET_ACCOUNTABLE_TEAM,
    GET_SITE_CODE,
    UPDATE_CCMS,
    GET_CCMS_OWNER
} from "./types";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const update_ccms = (data, id) => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(`/api/ccms/${id}/`, data)
        .then(res => {
            dispatch({
                type: UPDATE_CCMS,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err.response));
};

export const get_ccms_owner = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/ccms_owners/")
        .then(res => {
            dispatch({
                type: GET_CCMS_OWNER,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err.response));
};

export const get_site_code = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/site_code/")
        .then(res => {
            dispatch({
                type: GET_SITE_CODE,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err));
};

export const get_accountable_team = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/accountable_team/")
        .then(res => {
            dispatch({
                type: GET_ACCOUNTABLE_TEAM,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err));
};

export const get_escalation_type = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/escalation_type/")
        .then(res => {
            dispatch({
                type: GET_ESCALATION_TYPE,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err));
};

export const get_ticket_status = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/ticket_status/")
        .then(res => {
            dispatch({
                type: GET_TICKET_STATUS,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err));
};

export const get_business_unit = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/business_unit/")
        .then(res => {
            dispatch({
                type: GET_BUSINESS_UNIT,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err));
};

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
