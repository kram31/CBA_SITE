import {
    TOGGLE_FETCHING,
    LOADING_TOGGLE,
    CLEAR_UPLOAD_DETAILS,
    GET_CSAT_ADMIN,
    ADD_AGENT_SKILL,
    REMOVE_CSAT_ADMIN,
    ADD_CSAT_ADMIN,
    GET_USERS,
    DELETE_REQUEST_ACCESS,
    REQUEST_ACCESS,
    GET_ADMIN,
    COLLAPSE_COMPONENT,
    REQ_ERROR,
    CREATE_CSAT_RCA,
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
    GET_CBA_TEAMS,
    EDIT_CBA_TEAMS,
    ADD_CBA_TEAMS,
    ADD_RCA,
    FETCHING,
    ADD_SKILL,
    GET_TEAMLEADS,
    ADD_TEAMLEAD,
    ADD_DSAT_CODE1,
    ADD_BB_DRIVER_CODE2,
    ADD_BB_DRIVER_CODE3,
    ADD_CSAT_ACCOUNTABLE_TEAM,
    EDIT_CSAT_ACCOUNTABLE_TEAM,
    DELETE_CSAT_ACCOUNTABLE_TEAM,
    GET_RCAS,
    GET_BOTTOMBOX,
    GET_AGENTS,
    GET_ERRORS,
    STOP_FETCHING,
    GET_ALL_DATA,
    UPDATE_RCA,
    DELETE_RCA,
    UPDATE_AGENT,
    ADD_AGENT,
    GET_RCA,
    REMOVE_RCA,
    DELETE_DSAT_CODE1,
    UPDATE_DSAT_CODE1,
    UPDATE_BB_DRIVER_CODE2,
    UPDATE_BOTTOMBOX_DRIVER_STATE,
    DELETE_BB_DRIVER_CODE2,
    DELETE_BB_DRIVER_CODE3,
    UPDATE_BB_DRIVER_CODE3,
    UPDATE_AGENTS_COMPONENT_STATE,
    UPDATE_CHART_DATA,
    UPDATE_SELECTED_MONTH,
    UPDATE_SELECTED_WEEK,
    UPDATE_SELECTED_YEAR,
    UPDATE_AGENT_CHART_DATA,
    COLLAPSE_AGENT_VIEW,
    COLLAPSE_BOTTOMBOX_DRIVER_VIEW,
    COLLAPSE_SURVEY_VIEW,
    ADD_FAILED_SURVEY,
    GET_BOTTOMBOX_SURVEY_VIEW,
    GET_TOPBOX_SURVEY_VIEW,
    GET_COMPLETED_SURVEY_VIEW,
    GET_ALL_SURVEY_VIEW,
    COLLAPSE_DASHBOARD_VIEW,
    UPDATE_SURVEY,
} from "./types";

import { tokenConfig } from "./auth";

import { createMessage } from "./messages";

import axios from "axios";
import { axiosDefault } from "./config";

axios.defaults.baseURL = axiosDefault;

export class GeneralRequest {
    constructor(endpoint, data, dispatchType) {
        this.endpoint = endpoint;
        this.data = data;
        this.dispatchType = dispatchType;
    }

    addData = () => (dispatch) => {
        axios
            .post(`/api/${this.endpoint}/`, this.data)
            .then((res) => {
                dispatch({
                    type: this.dispatchType,
                    payload: res.data,
                });
            })
            .catch((err) => console.log(err.response));
    };

    deleteData = () => (dispatch) => {
        axios
            .delete(`/api/${this.endpoint}/${this.data.id}`)
            .then((res) => {
                dispatch({
                    type: this.dispatchType,
                    payload: this.data,
                });
            })
            .catch((err) => console.log(err.response));
    };

    editData = () => (dispatch) => {
        console.log("FROM ACTIONS", this.data);
        axios
            .put(`/api/${this.endpoint}/${this.data.id}/`, this.data)
            .then((res) => {
                dispatch({
                    type: this.dispatchType,
                    payload: res.data,
                });
            })
            .catch((err) => console.log(err.response));
    };
}

export const collapseComponent = (data) => (dispatch) =>
    dispatch({ type: COLLAPSE_COMPONENT, payload: data });

export const clearUploadDetails = () => (dispatch) =>
    dispatch({ type: CLEAR_UPLOAD_DETAILS });

export const loadingToggle = () => (dispatch) =>
    dispatch({ type: LOADING_TOGGLE });

export const getCsatAdmin = () => (dispatch) => {
    return axios
        .get(`/api/csat_admins/`)
        .then((res) => {
            dispatch({
                type: GET_CSAT_ADMIN,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteCsatAdmin = (data) => (dispatch) => {
    axios
        .delete(`/api/csat_admins/${data.id}/`)
        .then((res) => {
            dispatch({
                type: REMOVE_CSAT_ADMIN,
                payload: data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const addCsatAdmin = (data) => (dispatch) => {
    axios
        .post(`/api/csat_admins/`, data)
        .then((res) => {
            dispatch({
                type: ADD_CSAT_ADMIN,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getUsers = () => (dispatch) => {
    axios
        .get(`/api/users/`)
        .then((res) => {
            dispatch({
                type: GET_USERS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteRequestAccess = (data) => (dispatch) => {
    axios
        .delete(`/api/csat_access_request/${data.id}`)
        .then((res) => {
            dispatch({
                type: DELETE_REQUEST_ACCESS,
                payload: data,
            });
        })
        .catch((err) => {
            console.log(err.response);
        });
};

export const updateSurvey = (data) => (dispatch) => {
    // console.log(data);
    return axios
        .put(`/api/surveys/${data.reference_number}/`, data)
        .then((res) => {
            dispatch({
                type: UPDATE_SURVEY,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => {
            console.log(err);

            if ("response" in err) {
                const { status, statusText } = err.response;

                dispatch({
                    type: REQ_ERROR,
                    payload: {
                        statusText,
                        status,
                        ...JSON.parse(err.response.config.data),
                    },
                });
            }
        });
};

export const addSurvey = (data) => (dispatch) => {
    // console.log(data);
    return axios
        .post("/api/surveys/", data)
        .then((res) => {
            dispatch({
                type: ADD_SURVEY,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => {
            console.log(err);

            if ("response" in err) {
                const { status, statusText } = err.response;

                dispatch({
                    type: REQ_ERROR,
                    payload: {
                        statusText,
                        status,
                        ...JSON.parse(err.response.config.data),
                    },
                });
            }
        });
};

export const addSurveysBulk = (list_data) => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    if (list_data.put) {
        list_data.put.forEach((data) => {
            axios
                .put(`/api/surveys/${data.reference_number}/`, data)
                .then((res) => {
                    dispatch({
                        type: UPDATE_SURVEY,
                        payload: res.data,
                    });
                })
                .catch((err) => {
                    console.log(err);

                    if ("response" in err) {
                        const { status, statusText } = err.response;

                        dispatch({
                            type: REQ_ERROR,
                            payload: {
                                statusText,
                                status,
                                ...JSON.parse(err.response.config.data),
                            },
                        });
                    }
                });
        });
    }

    if (list_data.post) {
        list_data.post.forEach((data) => {
            axios
                .post("/api/surveys/", data)
                .then((res) => {
                    dispatch({
                        type: ADD_SURVEY,
                        payload: res.data,
                    });
                })
                .catch((err) => {
                    console.log(err);

                    if ("response" in err) {
                        const { status, statusText } = err.response;

                        dispatch({
                            type: REQ_ERROR,
                            payload: {
                                statusText,
                                status,
                                ...JSON.parse(err.response.config.data),
                            },
                        });
                    }
                });
        });
    }

    dispatch({
        type: STOP_FETCHING,
    });
};

// surveys: this.props.getSurveys(),
// rcas: this.props.getRcas(),
// skills: this.props.getSkills(),
// dsatCode1: this.props.getDsatCode1(),
// bbDriverCode2: this.props.getBBDriverCode2(),
// bbDriverCode3: this.props.getBBDriverCode3(),
// teams: this.props.getTeams(),
// agents: this.props.getAgents()

export const getAllSurveyView = () => (dispatch) => {
    dispatch({
        type: GET_ALL_SURVEY_VIEW,
    });
};

export const getCompletedSurveyView = () => (dispatch) => {
    dispatch({
        type: GET_COMPLETED_SURVEY_VIEW,
    });
};

export const getTopboxSurveyView = () => (dispatch) => {
    dispatch({
        type: GET_TOPBOX_SURVEY_VIEW,
    });
};

export const getBottomboxSurveyView = () => (dispatch) => {
    dispatch({
        type: GET_BOTTOMBOX_SURVEY_VIEW,
    });
};

export const dashboardViewCollapse = () => (dispatch) => {
    dispatch({
        type: COLLAPSE_DASHBOARD_VIEW,
    });
};

export const agentViewCollapse = () => (dispatch) => {
    dispatch({
        type: COLLAPSE_AGENT_VIEW,
    });
};

export const surveyViewCollapse = () => (dispatch) => {
    dispatch({
        type: COLLAPSE_SURVEY_VIEW,
    });
};

export const bottomboxDriverViewCollapse = () => (dispatch) => {
    dispatch({
        type: COLLAPSE_BOTTOMBOX_DRIVER_VIEW,
    });
};

export const updateChartData = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_CHART_DATA,
        payload: data,
    });
};

export const updateAgentChartData = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_AGENT_CHART_DATA,
        payload: data,
    });
};

export const updatedSelectedYear = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_SELECTED_YEAR,
        payload: data,
    });
};

export const updatedSelectedWeek = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_SELECTED_WEEK,
        payload: data,
    });
};

export const updatedSelectedMonth = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_SELECTED_MONTH,
        payload: data,
    });
};

export const updateBBDriverState = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_BOTTOMBOX_DRIVER_STATE,
        payload: data,
    });
};

export const updateAgentComponentState = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_AGENTS_COMPONENT_STATE,
        payload: data,
    });
};

export const removeRca = () => (dispatch) => {
    dispatch({
        type: REMOVE_RCA,
    });
};

export const getRca = (surveyData) => (dispatch) => {
    dispatch({
        type: GET_RCA,
        payload: surveyData.reference_number,
    });
};

export const addAgent = (newAgent) => (dispatch) => {
    return axios
        .post("/api/agents/", newAgent)
        .then((res) => {
            dispatch({
                type: ADD_AGENT,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => console.log(err.response));
};

export const updateAgent = (agentData) => (dispatch) => {
    axios
        .patch(`/api/agents/${agentData.operator_lan_id}/`, agentData)
        .then((res) => {
            dispatch({
                type: UPDATE_AGENT,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err.response));
};

export const deleteRca = (data) => (dispatch, getState) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .delete(`/api/csat_rcas/${data.id}`, tokenConfig(getState))
        .then((res) => {
            // dispatch(
            //     createMessage({ surveyDeleted: `Survey ID ${id} Deleted` })
            // );
            dispatch({
                type: DELETE_RCA,
                payload: data,
            });
            axios
                .put(
                    `/api/surveys/${data.surveyed_ticket}/`,
                    { agent: data.agent, completed: false },
                    tokenConfig(getState)
                )
                .then((res) =>
                    dispatch({
                        type: UPDATE_SURVEY,
                        payload: res.data,
                    })
                )
                .catch((err) => console.log(err.response));
        })
        .catch((err) => console.log(err.response.data));
};

export const updateRca = (rca) => (dispatch) => {
    console.log("FROM ACTIONS", rca);
    return axios
        .put(`/api/csat_rcas/${rca.id}/`, rca)
        .then((res) => {
            dispatch({
                type: UPDATE_RCA,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => console.log(err.response));
};

export const toggleFetch = () => (dispatch) =>
    dispatch({
        type: TOGGLE_FETCHING,
    });

export const getAllDataTeamLead = (myTeams) => (dispatch) => {
    console.log("NOT ADMIN", myTeams);
    return axios
        .all([
            axios.get(`/api/csat_rcas/?surveyed_ticket__scope=${myTeams}`),
            axios.get("/api/agent_skills/"),
            axios.get("/api/dsat_code1/"),
            axios.get("/api/bb_driver_code2/"),
            axios.get("/api/bb_driver_code3/"),
            axios.get("/api/csat_accountable_team/"),
            axios.get("/api/teamleads/"),
            axios.get("/api/cba_teams_readonly/"),
            axios.get("/api/csat_admins/"),
            axios.get("/api/csat_access_request/"),
        ])
        .then(
            axios.spread(
                (
                    csat_rcas,
                    agent_skills,
                    dsat_code1,
                    bb_driver_code2,
                    bb_driver_code3,
                    csat_accountable_team,
                    teamleads,
                    cba_teams,
                    csat_admin,
                    csat_access_request
                ) => {
                    dispatch({
                        type: GET_ALL_DATA,
                        payload: {
                            csat_rcas: csat_rcas.data,
                            agent_skills: agent_skills.data,
                            dsat_code1: dsat_code1.data,
                            bb_driver_code2: bb_driver_code2.data,
                            bb_driver_code3: bb_driver_code3.data,
                            csat_accountable_team: csat_accountable_team.data,
                            teamleads: teamleads.data,
                            cba_teams: cba_teams.data,
                            csat_admin: csat_admin.data,
                            csat_access_request: csat_access_request.data,
                        },
                    });
                    return "Success";
                }
            )
        )
        .catch((error) => {
            console.log(error.response);
        });
};

export const getAllData2 = () => (dispatch) => {
    return axios
        .all([
            axios.get("/api/surveys/"),
            axios.get("/api/csat_rcas/"),
            axios.get("/api/agent_skills/"),
            axios.get("/api/dsat_code1/"),
            axios.get("/api/bb_driver_code2/"),
            axios.get("/api/bb_driver_code3/"),
            axios.get("/api/csat_accountable_team/"),
            axios.get("/api/agents/"),
            axios.get("/api/teamleads/"),
            axios.get("/api/cba_teams_readonly/"),
            axios.get("/api/csat_admins/"),
            axios.get("/api/csat_access_request/"),
        ])
        .then(
            axios.spread(
                (
                    surveys,
                    csat_rcas,
                    agent_skills,
                    dsat_code1,
                    bb_driver_code2,
                    bb_driver_code3,
                    csat_accountable_team,
                    agents,
                    teamleads,
                    cba_teams,
                    csat_admin,
                    csat_access_request
                ) => {
                    dispatch({
                        type: GET_ALL_DATA,
                        payload: {
                            surveys: surveys.data,
                            csat_rcas: csat_rcas.data,
                            agent_skills: agent_skills.data,
                            dsat_code1: dsat_code1.data,
                            bb_driver_code2: bb_driver_code2.data,
                            bb_driver_code3: bb_driver_code3.data,
                            csat_accountable_team: csat_accountable_team.data,
                            agents: agents.data,
                            teamleads: teamleads.data,
                            cba_teams: cba_teams.data,
                            csat_admin: csat_admin.data,
                            csat_access_request: csat_access_request.data,
                        },
                    });
                    return "Success";
                }
            )
        )
        .catch((error) => {
            console.log(error.response);
        });
};

export const isFetching = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });
};

export const addCbaTeam = (data) => (dispatch) => {
    return axios
        .post("/api/cba_teams/", data)
        .then((res) => {
            dispatch({
                type: ADD_CBA_TEAMS,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => console.log(err.response.data));
};

export const getCbaTeams = () => (dispatch) => {
    return axios
        .get("/api/cba_teams_readonly/")
        .then((res) => {
            dispatch({
                type: GET_CBA_TEAMS,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => console.log(err.response.data));
};

export const editCbaTeam = (cba_team) => (dispatch) => {
    return axios
        .patch(`/api/cba_teams/${cba_team.id}/`, cba_team)
        .then((res) => {
            dispatch({
                type: EDIT_CBA_TEAMS,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const getSurveys = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/surveys/", tokenConfig(getState))
        .then((res) =>
            dispatch({
                type: GET_SURVEYS,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const getAgents = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/agents/")
        .then((res) =>
            dispatch({
                type: GET_AGENTS,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const getRcas = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/csat_rcas/")
        .then((res) =>
            dispatch({
                type: GET_RCAS,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const deleteSurvey = (id) => (dispatch, getState) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .delete(`/api/surveys/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch(
                createMessage({ surveyDeleted: `Survey ID ${id} Deleted` })
            );
            dispatch({
                type: DELETE_SURVEY,
                payload: id,
            });
        })
        .catch((err) => console.log(err.response.data));
};

export const addCsatRca = (data) => (dispatch) => {
    axios
        .post(`/api/csat_rcas/`, data)
        .then((res) =>
            dispatch({
                type: CREATE_CSAT_RCA,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const getSurvey = (data) => (dispatch) => {
    dispatch({
        type: GET_SURVEY,
        payload: data,
    });
};

export const removeSurvey = () => (dispatch) => {
    dispatch({
        type: REMOVE_SURVEY,
        payload: {},
    });
};

export const getAgentDetails = (lan_id) => (dispatch) => {
    axios
        .get(`/api/agents/${lan_id}`)
        .then((res) =>
            dispatch({
                type: GET_AGENT,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const getAgent = (data) => (dispatch) => {
    dispatch({
        type: GET_AGENT,
        payload: data,
    });
};

export const addAgentSkill = (data) => (dispatch) => {
    return axios
        .post("/api/agent_skills/", data)
        .then((res) => {
            dispatch({
                type: ADD_AGENT_SKILL,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const getSkills = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/agent_skills/")
        .then((res) =>
            dispatch({
                type: GET_SKILLS,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const getDsatCode1 = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/dsat_code1/")
        .then((res) =>
            dispatch({
                type: GET_DSAT_CODE1,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const getBBDriverCode2 = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/bb_driver_code2/")
        .then((res) =>
            dispatch({
                type: GET_BB_DRIVER_CODE2,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const getBBDriverCode3 = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/bb_driver_code3/")
        .then((res) =>
            dispatch({
                type: GET_BB_DRIVER_CODE3,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const addCsatAccountableTeam = (data) => (dispatch) => {
    axios
        .post("/api/csat_accountable_team/", data)
        .then((res) =>
            dispatch({
                type: ADD_CSAT_ACCOUNTABLE_TEAM,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err));
};
export const editCsatAccountableTeam = (data) => (dispatch) => {
    axios
        .put("/api/csat_accountable_team/", data)
        .then((res) =>
            dispatch({
                type: EDIT_CSAT_ACCOUNTABLE_TEAM,
                payload: { new: res.data, old: data },
            })
        )
        .catch((err) => console.log(err));
};
export const deleteCsatAccountableTeam = (data) => (dispatch) => {
    axios
        .delete(`/api/csat_accountable_team/${data.name}/`)
        .then((res) =>
            dispatch({
                type: DELETE_CSAT_ACCOUNTABLE_TEAM,
                payload: data,
            })
        )
        .catch((err) => console.log(err));
};

export const getTeams = () => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .get("/api/csat_accountable_team/")
        .then((res) =>
            dispatch({
                type: GET_TEAMS,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response.data));
};

export const addRCA = (rcaData, agentData) => (dispatch, getState) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .post("/api/csat_rcas/", rcaData, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_RCA,
                payload: res.data,
            });
            axios
                .put(
                    `/api/surveys/${rcaData.surveyed_ticket}/`,
                    agentData,
                    tokenConfig(getState)
                )
                .then((res) => {
                    console.log(res.data);
                    dispatch({
                        type: UPDATE_SURVEY,
                        payload: res.data,
                    });
                })
                .catch((err) => console.log(err.response));
        })
        .catch((err) => console.log(err.response));
};

export const getTeamLeads = () => (dispatch) => {
    return axios
        .get("/api/teamleads/")
        .then((res) => {
            dispatch({
                type: GET_TEAMLEADS,
                payload: res.data,
            });
            return res.data;
        })
        .catch((err) => console.log(err.response.data));
};

export const addTeamLead = (data) => (dispatch) => {
    axios
        .post("/api/teamleads/", data)
        .then((res) =>
            dispatch({
                type: ADD_TEAMLEAD,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err));
};

export const addDsatCode1 = (data) => (dispatch) => {
    dispatch({
        type: FETCHING,
    });

    axios
        .post("/api/dsat_code1/", data)
        .then((res) =>
            dispatch({
                type: ADD_DSAT_CODE1,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response));
};

export const deleteDsatCode1 = (data) => (dispatch) => {
    axios
        .delete(`/api/dsat_code1/${data.id}`)
        .then((res) => {
            dispatch({
                type: DELETE_DSAT_CODE1,
                payload: data,
            });
        })
        .catch((err) => console.log(err.response.data));
};

export const updateDsatCode1 = (oldData, newData) => (dispatch) => {
    axios
        .put(`/api/dsat_code1/${oldData.id}/`, newData)
        .then((res) => {
            dispatch({
                type: UPDATE_DSAT_CODE1,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err.response));
};

export const addBbDriverCode2 = (data) => (dispatch) => {
    axios
        .post("/api/bb_driver_code2/", data)
        .then((res) =>
            dispatch({
                type: ADD_BB_DRIVER_CODE2,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.response));
};

export const deleteBbDriverCode2 = (data) => (dispatch) => {
    axios
        .delete(`/api/bb_driver_code2/${data.id}`)
        .then((res) => {
            dispatch({
                type: DELETE_BB_DRIVER_CODE2,
                payload: data,
            });
        })
        .catch((err) => console.log(err.response.data));
};

export const deleteBbDriverCode3 = (data) => (dispatch) => {
    axios
        .delete(`/api/bb_driver_code3/${data.id}`)
        .then((res) => {
            dispatch({
                type: DELETE_BB_DRIVER_CODE3,
                payload: data,
            });
        })
        .catch((err) => console.log(err.response.data));
};

export const updateBbDriverCode2 = (oldData, newData) => (dispatch) => {
    axios
        .put(`/api/bb_driver_code2/${oldData.id}/`, newData)
        .then((res) => {
            dispatch({
                type: UPDATE_BB_DRIVER_CODE2,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err.response));
};

export const updateBbDriverCode3 = (oldData, newData) => (dispatch) => {
    axios
        .put(`/api/bb_driver_code3/${oldData.id}/`, newData)
        .then((res) => {
            dispatch({
                type: UPDATE_BB_DRIVER_CODE3,
                payload: res.data,
            });
        })
        .catch((err) => console.log(err.response));
};

export const addBbDriverCode3 = (data) => (dispatch) => {
    axios
        .post("/api/bb_driver_code3/", data)
        .then((res) =>
            dispatch({
                type: ADD_BB_DRIVER_CODE3,
                payload: res.data,
            })
        )
        .catch((err) => console.log(err.reponse));
};
