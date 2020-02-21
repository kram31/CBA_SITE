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
    GET_CCMS_OWNER,
    GET_CCMS_STATUS,
    ADD_COMMENT,
    GET_SILO,
    GET_TICKET_TYPE,
    GET_SELECTED_CCMS,
    REMOVE_SELECTED_CCMS,
    GET_CCMS_LIST_PER_USER,
    OPEN_COLLAPSE,
    CLOSE_COLLAPSE,
    SEARCH,
    GET_CCMS_ADMIN_LIST,
    GET_USERS_LIST,
    REMOVE_USER_FROM_CCMS_ADMIN,
    ADD_USER_TO_CCMS_ADMIN,
    TOGGLE_MODAL,
    OPEN_MODAL,
    CLOSE_MODAL,
    FETCHING_COMMENTS,
    ADD_REQUEST_ACCESS,
    GET_REQUEST_ACCESS,
    ADD_CCMS_OWNER,
    REMOVE_ACCESS_REQUEST,
    GET_CAUSE_CODE,
    GET_ESCALATION_DRIVER,
    GET_ESCALATION_DRIVER_CAUSE,
    ADD_CAUSE_CODE,
    DELETE_CAUSE_CODE,
    EDIT_CAUSE_CODE,
    ADD_ESCALATION_DRIVER,
    DELETE_ESCALATION_DRIVER,
    EDIT_ESCALATION_DRIVER,
    ADD_ESCALATION_DRIVER_CAUSE,
    DELETE_ESCALATION_DRIVER_CAUSE,
    EDIT_ESCALATION_DRIVER_CAUSE,
    GET_CCMS_RCA,
    CLOSE_RCA_MODAL
} from "./types";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const close_ccms_rca = () => dispatch => {
    dispatch({
        type: CLOSE_RCA_MODAL
    });
};

export const get_ccms_rca = data => dispatch => {
    axios.get(`/api/ccms_rca/?ccms__id=${data.id}`).then(res => {
        dispatch({
            type: GET_CCMS_RCA,
            payload: res.data
        });
    });
};

export const addEscalationDriverCause = data => dispatch => {
    axios
        .post(`/api/escalation_driver_cause/`, data)
        .then(res => {
            dispatch({
                type: ADD_ESCALATION_DRIVER_CAUSE,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const deleteEscalationDriverCause = data => dispatch => {
    // console.log(`FROM REDUX ACTION - DELETE`);
    // console.log(data);

    axios.delete(`/api/escalation_driver_cause/${data.id}/`).then(res => {
        dispatch({
            type: DELETE_ESCALATION_DRIVER_CAUSE,
            payload: data
        });
    });
};

export const editEscalationDriverCause = (oldData, newData) => dispatch => {
    console.log(`FROM REDUX ACTION - EDIT`);
    console.log("OLDDATA");
    console.log(oldData);
    console.log("NewDATA");
    console.log(newData);

    axios
        .put(`/api/escalation_driver_cause/${oldData.id}/`, newData)
        .then(res => {
            dispatch({
                type: EDIT_ESCALATION_DRIVER_CAUSE,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const addEscalationDriver = data => dispatch => {
    axios
        .post(`/api/escalation_driver/`, data)
        .then(res => {
            dispatch({
                type: ADD_ESCALATION_DRIVER,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const deleteEscalationDriver = data => dispatch => {
    // console.log(`FROM REDUX ACTION - DELETE`);
    // console.log(data);

    axios.delete(`/api/escalation_driver/${data.id}/`).then(res => {
        dispatch({
            type: DELETE_ESCALATION_DRIVER,
            payload: data
        });
    });
};

export const editEscalationDriver = (oldData, newData) => dispatch => {
    console.log(`FROM REDUX ACTION - EDIT`);
    console.log("OLDDATA");
    console.log(oldData);
    console.log("NewDATA");
    console.log(newData);

    axios
        .put(`/api/escalation_driver/${oldData.id}/`, newData)
        .then(res => {
            dispatch({
                type: EDIT_ESCALATION_DRIVER,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const edit_cause_code = (oldData, newData) => dispatch => {
    console.log(`FROM REDUX ACTION - EDIT`);
    console.log("OLDDATA");
    console.log(oldData);
    console.log("NewDATA");
    console.log(newData);

    axios.put(`/api/cause_code/${oldData.id}/`, newData).then(res => {
        dispatch({
            type: EDIT_CAUSE_CODE,
            payload: res.data
        });
    });
};

export const delete_cause_code = data => dispatch => {
    // console.log(`FROM REDUX ACTION - DELETE`);
    // console.log(data);

    axios.delete(`/api/cause_code/${data.id}/`).then(res => {
        dispatch({
            type: DELETE_CAUSE_CODE,
            payload: data
        });
    });
};

export const add_cause_code = data => dispatch => {
    console.log(`FROM REDUX ACTION - ADD`);
    console.log(data);
    axios.post(`/api/cause_code/`, data).then(res => {
        dispatch({
            type: ADD_CAUSE_CODE,
            payload: res.data
        });
    });
};

export const get_all_data = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/users/")
        .then(res => {
            dispatch({
                type: GET_USERS_LIST,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));

    axios
        .get("/api/group/")
        .then(res => {
            dispatch({
                type: GET_CCMS_ADMIN_LIST,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));

    axios
        .get("/api/silo/")
        .then(res => {
            dispatch({
                type: GET_SILO,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));

    axios
        .get("/api/ticket_type/")
        .then(res => {
            dispatch({
                type: GET_TICKET_TYPE,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));

    axios
        .get("/api/ccms_status/")
        .then(res => {
            dispatch({
                type: GET_CCMS_STATUS,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));

    axios
        .get("/api/ccms_owners/")
        .then(res => {
            dispatch({
                type: GET_CCMS_OWNER,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));

    axios
        .get("/api/site_code/")
        .then(res => {
            dispatch({
                type: GET_SITE_CODE,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/accountable_team/")
        .then(res => {
            dispatch({
                type: GET_ACCOUNTABLE_TEAM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/escalation_type/")
        .then(res => {
            dispatch({
                type: GET_ESCALATION_TYPE,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/ticket_status/")
        .then(res => {
            dispatch({
                type: GET_TICKET_STATUS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/business_unit/")
        .then(res => {
            dispatch({
                type: GET_BUSINESS_UNIT,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/ccms/")
        .then(res => {
            dispatch({
                type: GET_CCMS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/cause_code/")
        .then(res => {
            dispatch({
                type: GET_CAUSE_CODE,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/escalation_driver/")
        .then(res => {
            dispatch({
                type: GET_ESCALATION_DRIVER,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    axios
        .get("/api/escalation_driver_cause/")
        .then(res => {
            dispatch({
                type: GET_ESCALATION_DRIVER_CAUSE,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

    dispatch({
        type: STOP_FETCHING
    });
};

export const get_access_request = () => dispatch => {
    axios.get(`/api/ccms_access_request/`).then(res => {
        dispatch({
            type: GET_REQUEST_ACCESS,
            payload: res.data
        });
    });
};

export const add_ccms_owner = data => dispatch => {
    console.log(data.user.user);
    axios
        .post(`/api/ccms_owners/`, { user: data.user.user })
        .then(
            res => {
                dispatch({
                    type: ADD_CCMS_OWNER,
                    payload: res.data
                });
            },
            axios.delete(`/api/ccms_access_request/${data.id}`).then(res => {
                dispatch({
                    type: REMOVE_ACCESS_REQUEST,
                    payload: data
                });
            })
        )
        .catch(err => console.log(err.response));
};

export const add_access_request = data => dispatch => {
    axios
        .post(`/api/ccms_access_request/`, { user: data })
        .then(res => {
            dispatch({
                type: ADD_REQUEST_ACCESS,
                payload: res.data
            });
            console.log(res.data);
        })
        .catch(err => console.log(err.response));
};

export const get_selected_ccms_new = data => dispatch => {
    dispatch({
        type: FETCHING_COMMENTS
    });

    // WILL INCLUDE
    axios.get(`/api/comments/?ccms__id=${data.id}`).then(res => {
        dispatch({
            type: GET_SELECTED_CCMS,
            payload: { comments: res.data, selected_ccms: data }
        });
    });
};

export const open_modal = () => dispatch => {
    dispatch({
        type: OPEN_MODAL
    });
};
export const close_modal = () => dispatch => {
    dispatch({
        type: CLOSE_MODAL
    });
};

export const toggle_modal = () => dispatch => {
    dispatch({
        type: TOGGLE_MODAL
    });
};

export const search_ccms = data => dispatch => {
    dispatch({
        type: SEARCH,
        payload: data
    });
};

export const close_collapse = () => dispatch => {
    dispatch({
        type: CLOSE_COLLAPSE
    });
};

export const open_collapse = () => dispatch => {
    dispatch({
        type: OPEN_COLLAPSE
    });
};

export const get_ccms_list_per_user = data => dispatch => {
    dispatch({
        type: GET_CCMS_LIST_PER_USER,
        payload: data
    });
};

export const remove_selected_ccms = () => dispatch => {
    dispatch({
        type: REMOVE_SELECTED_CCMS
    });
};

export const get_selected_ccms = data => dispatch => {
    dispatch({
        type: GET_SELECTED_CCMS,
        payload: data
    });
};

export const add_user_to_ccms_admin = users_list => dispatch => {
    users_list.forEach(item => {
        axios
            .put(`/api/users/${item.user.id}/`, {
                groups: [1]
            })
            .then(res => {
                dispatch({
                    type: ADD_USER_TO_CCMS_ADMIN,
                    payload: res.data
                });
                dispatch({
                    type: STOP_FETCHING
                });
            })
            .catch(err => console.log(err.response));
    });
};

export const remove_user_from_ccms_admin = ccms_admin_list => dispatch => {
    ccms_admin_list.forEach(item => {
        axios
            .put(`/api/users/${item.id}/`, {
                groups: []
            })
            .then(res => {
                dispatch({
                    type: REMOVE_USER_FROM_CCMS_ADMIN,
                    payload: res.data
                });
                dispatch({
                    type: STOP_FETCHING
                });
            })
            .catch(err => console.log(err.response));
    });
};

export const add_comment = data => dispatch => {
    axios
        .post("/api/comments/", data)
        .then(res => {
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

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

export const get_users_list = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/users/")
        .then(res => {
            dispatch({
                type: GET_USERS_LIST,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err.response));
};

export const get_ccms_admin_list = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/group/")
        .then(res => {
            dispatch({
                type: GET_CCMS_ADMIN_LIST,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err.response));
};

export const get_silo = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/silo/")
        .then(res => {
            dispatch({
                type: GET_SILO,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err.response));
};

export const get_ticket_type = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/ticket_type/")
        .then(res => {
            dispatch({
                type: GET_TICKET_TYPE,
                payload: res.data
            });
            dispatch({
                type: STOP_FETCHING
            });
        })
        .catch(err => console.log(err.response));
};

export const get_ccms_status = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/ccms_status/")
        .then(res => {
            dispatch({
                type: GET_CCMS_STATUS,
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

export const getComments = id => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get(`/api/comments/?ccms__id=${id}`)
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
