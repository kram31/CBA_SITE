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
} from "../actions/types";
import { keys } from "../components/bottombox/upload-data/helpers/obj-keys";

const initialState = {
    surveys: [],
    headers: keys,
    survey: {},
    agent: {},
    skills: [],
    dsat_code1: [],
    bb_driver_code2: [],
    bb_driver_code3: [],
    teams: [],
    bottombox_not_completed: [],
    rcas: []
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SURVEYS:
            return {
                ...state,
                surveys: action.payload,
                bottombox_not_completed: action.payload.filter(
                    survey => survey.bottombox != 0 && !survey.rca
                )
            };
        case DELETE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.filter(
                    item => action.payload != item.reference_number
                )
            };
        case ADD_SURVEY:
            return {
                ...state,
                surveys: [action.payload, ...state.surveys]
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
                agent: {},
                skills: [],
                dsat_code1: [],
                bb_driver_code2: [],
                bb_driver_code3: [],
                teams: []
            };
        case GET_AGENT:
            return {
                ...state,
                agent: action.payload
            };
        case GET_SKILLS:
            return {
                ...state,
                skills: action.payload
            };
        case GET_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: action.payload
            };
        case GET_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: action.payload
            };
        case GET_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: action.payload
            };
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload
            };
        case ADD_RCA:
            return {
                ...state,
                rcas: [action.payload, ...state.rcas],
                bottombox_not_completed: state.bottombox_not_completed.filter(
                    item =>
                        action.payload.surveyed_ticket != item.reference_number
                )
            };
        default:
            return state;
    }
};

export default surveyReducer;
