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
    ADD_RCA,
    FETCHING,
    ADD_SKILL,
    GET_TEAMLEADS,
    ADD_TEAMLEAD,
    ADD_DSAT_CODE1,
    ADD_BB_DRIVER_CODE2,
    ADD_BB_DRIVER_CODE3,
    ADD_TEAM,
    GET_RCAS,
    GET_BOTTOMBOX,
    GET_AGENTS,
    GET_ERRORS,
    STOP_FETCHING,
    GET_ALL_DATA,
    UPDATE_SURVEY,
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
    UPDATE_AGENTS_COMPONENT_STATE
} from "./types";

import { tokenConfig } from "./auth";

import { createMessage } from "./messages";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

// surveys: this.props.getSurveys(),
// rcas: this.props.getRcas(),
// skills: this.props.getSkills(),
// dsatCode1: this.props.getDsatCode1(),
// bbDriverCode2: this.props.getBBDriverCode2(),
// bbDriverCode3: this.props.getBBDriverCode3(),
// teams: this.props.getTeams(),
// agents: this.props.getAgents()

export const updateBBDriverState = data => dispatch => {
    dispatch({
        type: UPDATE_BOTTOMBOX_DRIVER_STATE,
        payload: data
    });
};

export const updateAgentComponentState = data => dispatch => {
    dispatch({
        type: UPDATE_AGENTS_COMPONENT_STATE,
        payload: data
    });
};

export const removeRca = () => dispatch => {
    dispatch({
        type: REMOVE_RCA
    });
};

export const getRca = surveyData => dispatch => {
    dispatch({
        type: GET_RCA,
        payload: surveyData.reference_number
    });
};

export const addAgent = newAgent => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/agents/", newAgent, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_AGENT,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const updateAgent = agentData => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(
            `/api/agents/${agentData.operator_lan_id}/`,
            agentData,
            tokenConfig(getState)
        )
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UPDATE_AGENT,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const deleteRca = data => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .delete(`/api/rca/${data.id}`, tokenConfig(getState))
        .then(res => {
            // dispatch(
            //     createMessage({ surveyDeleted: `Survey ID ${id} Deleted` })
            // );
            dispatch({
                type: DELETE_RCA,
                payload: data
            });
            axios
                .put(
                    `/api/surveys/${data.surveyed_ticket}/`,
                    { agent: data.agent, completed: false },
                    tokenConfig(getState)
                )
                .then(res =>
                    dispatch({
                        type: DELETE_RCA,
                        payload: res.data
                    })
                )
                .catch(err => console.log(err.response));
        })
        .catch(err => console.log(err.response.data));
};

export const updateRca = rca_data => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(`/api/rca/${rca_data.id}/`, rca_data, tokenConfig(getState))
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UPDATE_RCA,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const updateSurvey = survey_data => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(
            `/api/surveys/${survey_data.reference_number}/`,
            survey_data,
            tokenConfig(getState)
        )
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UPDATE_SURVEY,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const getAllData2 = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });
    axios
        .all([
            axios.get("/api/surveys/", tokenConfig(getState)),
            axios.get("/api/rca/", tokenConfig(getState)),
            axios.get("/api/skills/"),
            axios.get("/api/dsat_code1/"),
            axios.get("/api/bb_driver_code2/"),
            axios.get("/api/bb_driver_code3/"),
            axios.get("/api/team/"),
            axios.get("/api/agents/"),
            axios.get("/api/teamleads/")
        ])
        .then(
            axios.spread(
                (
                    surveys,
                    rcas,
                    skills,
                    dsat_code1,
                    bb_driver_code2,
                    bb_driver_code3,
                    teams,
                    agents,
                    teamleads
                ) => {
                    dispatch({
                        type: GET_ALL_DATA,
                        payload: {
                            surveys: surveys.data,
                            rcas: rcas.data,
                            skills: skills.data,
                            dsat_code1: dsat_code1.data,
                            bb_driver_code2: bb_driver_code2.data,
                            bb_driver_code3: bb_driver_code3.data,
                            teams: teams.data,
                            agents: agents.data,
                            teamleads: teamleads.data
                        }
                    });
                    dispatch({
                        type: STOP_FETCHING
                    });
                }
            )
        )
        .catch(error => {
            dispatch({
                type: STOP_FETCHING
            });
            console.log(error.response);
        });
};

export const getAllData = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });
    Promise.all([
        axios
            .get("/api/surveys/", tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: GET_SURVEYS,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data)),
        axios
            .get("/api/rca/")
            .then(res =>
                dispatch({
                    type: GET_RCAS,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data)),
        axios
            .get("/api/skills/")
            .then(res =>
                dispatch({
                    type: GET_SKILLS,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data)),
        axios
            .get("/api/dsat_code1/")
            .then(res =>
                dispatch({
                    type: GET_DSAT_CODE1,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data)),
        axios
            .get("/api/bb_driver_code2/")
            .then(res =>
                dispatch({
                    type: GET_BB_DRIVER_CODE2,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data)),
        axios
            .get("/api/bb_driver_code3/")
            .then(res =>
                dispatch({
                    type: GET_BB_DRIVER_CODE3,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data)),
        axios
            .get("/api/team/")
            .then(res =>
                dispatch({
                    type: GET_TEAMS,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data)),
        axios
            .get("/api/agents/")
            .then(res =>
                dispatch({
                    type: GET_AGENTS,
                    payload: res.data
                })
            )
            .catch(err => console.log(err.response.data))
    ]);
};

export const isFetching = () => dispatch => {
    dispatch({
        type: FETCHING
    });
};

export const getSurveys = () => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/surveys/", tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_SURVEYS,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const getAgents = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/agents/")
        .then(res =>
            dispatch({
                type: GET_AGENTS,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const getRcas = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/rca/")
        .then(res =>
            dispatch({
                type: GET_RCAS,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const deleteSurvey = id => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .delete(`/api/surveys/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(
                createMessage({ surveyDeleted: `Survey ID ${id} Deleted` })
            );
            dispatch({
                type: DELETE_SURVEY,
                payload: id
            });
        })
        .catch(err => console.log(err.response.data));
};

export const addSurveysBulk = list_data => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    const post_reqs = list_data.map(data => {
        axios
            .post("/api/surveys/", data, tokenConfig(getState))
            .then(res => {
                dispatch({
                    type: ADD_SURVEY,
                    payload: res.data
                });
                dispatch({
                    type: GET_BOTTOMBOX,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err);
                let errors;

                if (err.response) {
                    errors = {
                        msg: err.response.data,
                        status: err.response.status
                    };
                    dispatch({
                        type: GET_ERRORS,
                        payload: errors
                    });
                    dispatch({
                        type: STOP_FETCHING
                    });
                }
            });
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
    axios
        .get(`/api/agents/${lan_id}`)
        .then(res =>
            dispatch({
                type: GET_AGENT,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const getAgent = data => dispatch => {
    dispatch({
        type: GET_AGENT,
        payload: data
    });
};

export const addSkill = data => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/skills/", data)
        .then(res =>
            dispatch({
                type: ADD_SKILL,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const getSkills = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/skills/")
        .then(res =>
            dispatch({
                type: GET_SKILLS,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const getDsatCode1 = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/dsat_code1/")
        .then(res =>
            dispatch({
                type: GET_DSAT_CODE1,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const getBBDriverCode2 = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/bb_driver_code2/")
        .then(res =>
            dispatch({
                type: GET_BB_DRIVER_CODE2,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const getBBDriverCode3 = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/bb_driver_code3/")
        .then(res =>
            dispatch({
                type: GET_BB_DRIVER_CODE3,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const addTeam = data => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/team/", data)
        .then(res =>
            dispatch({
                type: ADD_TEAM,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const getTeams = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/team/")
        .then(res =>
            dispatch({
                type: GET_TEAMS,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const addRCA = (rcaData, agentData) => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/rca/", rcaData, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_RCA,
                payload: res.data
            });
            axios
                .put(
                    `/api/surveys/${rcaData.surveyed_ticket}/`,
                    agentData,
                    tokenConfig(getState)
                )
                .then(res => console.log(res))
                .catch(err => console.log(err.response));
        })
        .catch(err => console.log(err.response.data));
};

export const getTeamLeads = () => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .get("/api/teamleads/")
        .then(res =>
            dispatch({
                type: GET_TEAMLEADS,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response.data));
};

export const addTeamLead = data => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/teamleads/", data)
        .then(res =>
            dispatch({
                type: ADD_TEAMLEAD,
                payload: res.data
            })
        )
        .catch(err => console.log(err));
};

export const addDsatCode1 = data => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/dsat_code1/", data)
        .then(res =>
            dispatch({
                type: ADD_DSAT_CODE1,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response));
};

export const deleteDsatCode1 = id => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .delete(`/api/dsat_code1/${id}`, tokenConfig(getState))
        .then(res => {
            // dispatch(
            //     createMessage({ surveyDeleted: `Survey ID ${id} Deleted` })
            // );
            dispatch({
                type: DELETE_DSAT_CODE1,
                payload: id
            });
        })
        .catch(err => console.log(err.response.data));
};

export const updateDsatCode1 = data => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(`/api/dsat_code1/${data.id}/`, data, tokenConfig(getState))
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UPDATE_DSAT_CODE1,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const addBbDriverCode2 = data => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/bb_driver_code2/", data)
        .then(res =>
            dispatch({
                type: ADD_BB_DRIVER_CODE2,
                payload: res.data
            })
        )
        .catch(err => console.log(err.response));
};

export const deleteBbDriverCode2 = id => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .delete(`/api/bb_driver_code2/${id}`, tokenConfig(getState))
        .then(res => {
            // dispatch(
            //     createMessage({ surveyDeleted: `Survey ID ${id} Deleted` })
            // );
            dispatch({
                type: DELETE_BB_DRIVER_CODE2,
                payload: id
            });
        })
        .catch(err => console.log(err.response.data));
};

export const deleteBbDriverCode3 = id => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .delete(`/api/bb_driver_code3/${id}`, tokenConfig(getState))
        .then(res => {
            // dispatch(
            //     createMessage({ surveyDeleted: `Survey ID ${id} Deleted` })
            // );
            dispatch({
                type: DELETE_BB_DRIVER_CODE3,
                payload: id
            });
        })
        .catch(err => console.log(err.response.data));
};

export const updateBbDriverCode2 = data => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(`/api/bb_driver_code2/${data.id}/`, data, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_BB_DRIVER_CODE2,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const updateBbDriverCode3 = data => (dispatch, getState) => {
    dispatch({
        type: FETCHING
    });

    axios
        .put(`/api/bb_driver_code3/${data.id}/`, data, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_BB_DRIVER_CODE3,
                payload: res.data
            });
        })
        .catch(err => console.log(err.response));
};

export const addBbDriverCode3 = data => dispatch => {
    dispatch({
        type: FETCHING
    });

    axios
        .post("/api/bb_driver_code3/", data)
        .then(res =>
            dispatch({
                type: ADD_BB_DRIVER_CODE3,
                payload: res.data
            })
        )
        .catch(err => console.log(err.reponse));
};
