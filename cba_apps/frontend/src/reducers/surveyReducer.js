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
    STOP_FETCHING,
    GET_ALL_DATA,
    UPDATE_SURVEY,
    UPDATE_RCA,
    DELETE_RCA,
    UPDATE_AGENT,
    ADD_AGENT,
    GET_RCA,
    REMOVE_RCA
} from "../actions/types";
import { keys } from "../components/bottombox/upload-data/helpers/obj-keys";

let agent_headers = [
    "operator_lan_id",
    "surveys",
    "name",
    "email",
    "location",
    "wave",
    "skill",
    "team_lead"
];

var now = new Date();
var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
console.log(lastSunday);

const initialState = {
    surveys: [],
    agents: [],
    headers: keys,
    survey: {},
    agent: {},
    skills: [],
    dsat_code1: [],
    bb_driver_code2: [],
    bb_driver_code3: [],
    teams: [],
    rcas: null,
    teamleads: [],
    bottombox: [],
    isFetching: false,
    agent_headers,
    rca: {},
    doughnutChartSurveyData: [],
    pieChartCompletedSurveysCount: [],
    rcaTopDrivers: {}
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DATA:
            const {
                surveys,
                rcas,
                skills,
                dsat_code1,
                bb_driver_code2,
                bb_driver_code3,
                teams,
                agents,
                teamleads
            } = action.payload;
            return {
                ...state,
                surveys: surveys,
                bottombox: surveys.filter(
                    item => item.bottombox == 1 && !item.rca
                ),
                doughnutChartSurveyData: [
                    surveys.length,
                    surveys.filter(item => item.bottombox == 1).length
                ],
                pieChartCompletedSurveysCount: [
                    surveys.filter(item => item.completed == true).length,
                    surveys.length
                ],
                rcas,
                skills,
                dsat_code1,
                bb_driver_code2,
                bb_driver_code3,
                teams,
                agents,
                teamleads
            };
            break;
        case FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case STOP_FETCHING:
            return {
                ...state,
                isFetching: false
            };
        case GET_SURVEYS:
            return {
                ...state,
                surveys: action.payload,
                bottombox: action.payload.filter(
                    item => item.bottombox == 1 && !item.rca
                ),
                isFetching: false
            };
        case GET_AGENTS:
            return {
                ...state,
                agents: action.payload,
                isFetching: false
            };
        case GET_RCAS:
            return {
                ...state,
                rcas: action.payload,
                isFetching: false
            };
        case DELETE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.filter(
                    item => action.payload != item.reference_number
                ),
                bottombox: state.bottombox.filter(
                    item => action.payload != item.reference_number
                ),
                rcas: state.rcas.filter(
                    item => action.payload != item.surveyed_ticket
                ),
                isFetching: false
            };
        case ADD_SURVEY:
            return {
                ...state,
                surveys: [action.payload, ...state.surveys],
                isFetching: false
            };
        case GET_BOTTOMBOX:
            return {
                ...state,
                bottombox: [
                    ...(action.payload.bottombox == 1 && [action.payload]),
                    ...state.bottombox
                ],
                isFetching: false
            };
        case GET_SURVEY:
            return {
                ...state,
                survey: action.payload
            };
        case REMOVE_SURVEY:
            return {
                ...state,
                survey: action.payload,
                agent: {}
            };
        case GET_AGENT:
            return {
                ...state,
                agent: action.payload
            };
        case GET_SKILLS:
            return {
                ...state,
                skills: action.payload,
                isFetching: false
            };
        case GET_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: action.payload,
                isFetching: false
            };
        case GET_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: action.payload,
                isFetching: false
            };
        case GET_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: action.payload,
                isFetching: false
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                isFetching: false
            };
        case ADD_TEAM:
            return {
                ...state,
                teams: [action.payload, ...state.teams],
                isFetching: false
            };
        case ADD_RCA:
            return {
                ...state,
                rcas: [action.payload, ...state.rcas],
                bottombox: state.bottombox.filter(
                    item =>
                        action.payload.surveyed_ticket != item.reference_number
                ),
                pieChartCompletedSurveysCount: state.pieChartCompletedSurveysCount.map(
                    (val, index, arr) => (index == 0 ? val + 1 : val)
                ),
                isFetching: false
            };
        case ADD_SKILL:
            return {
                ...state,
                skills: [action.payload, ...state.skills],
                isFetching: false
            };
        case GET_TEAMLEADS:
            return {
                ...state,
                teamleads: action.payload,
                isFetching: false
            };
        case ADD_TEAMLEAD:
            return {
                ...state,
                teamleads: [action.payload, ...state.teamleads],
                isFetching: false
            };
        case ADD_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: [action.payload, ...state.dsat_code1],
                isFetching: false
            };
        case ADD_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: [action.payload, ...state.bb_driver_code2],
                isFetching: false
            };
        case ADD_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: [action.payload, ...state.bb_driver_code3],
                isFetching: false
            };
        case UPDATE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.map(survey => {
                    if (
                        survey.reference_number ==
                        action.payload.reference_number
                    ) {
                        return action.payload;
                    } else {
                        return survey;
                    }
                }),
                isFetching: false
            };
        case UPDATE_RCA:
            return {
                ...state,
                rcas: state.rcas.map(rca => {
                    if (rca.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return rca;
                    }
                }),
                isFetching: false
            };
        case DELETE_RCA:
            return {
                ...state,
                rcas: state.rcas.filter(item => action.payload.id != item.id),
                bottombox: [action.payload, ...state.bottombox],
                pieChartCompletedSurveysCount: state.pieChartCompletedSurveysCount.map(
                    (val, index, arr) => (index == 0 ? val - 1 : val)
                ),

                isFetching: false
            };
        case UPDATE_AGENT:
            return {
                ...state,
                agents: state.agents.map(agent => {
                    if (
                        agent.operator_lan_id == action.payload.operator_lan_id
                    ) {
                        return action.payload;
                    } else {
                        return agent;
                    }
                }),
                isFetching: false
            };
        case ADD_AGENT:
            return {
                ...state,
                agents: [action.payload, ...state.agents],
                isFetching: false
            };
        case GET_RCA:
            return {
                ...state,
                rca: state.rcas.find(rca => {
                    return action.payload == rca.surveyed_ticket;
                })
            };
        case REMOVE_RCA:
            return {
                ...state,
                rca: {}
            };
        default:
            return state;
    }
};

export default surveyReducer;
