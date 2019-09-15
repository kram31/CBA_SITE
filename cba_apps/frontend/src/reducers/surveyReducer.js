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
    ADD_TEAM
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
    rcas: [],
    teamleads: [],
    isFetching: false
    
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case GET_SURVEYS:
            return {
                ...state,
                surveys: action.payload,
                isFetching: false
            };
        case DELETE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.filter(
                    item => action.payload != item.reference_number
                ),
                isFetching: false
            };
        case ADD_SURVEY:
            return {
                ...state,
                surveys: [action.payload, ...state.surveys],
                isFetching: false
            };
        case GET_SURVEY:
            return {
                ...state,
                survey: action.payload,
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
                agent: action.payload,

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
                isFetching: false
            };
        case ADD_SKILL:
            return {
                ...state,
                skills: [action.payload, ...state.skills],
                isFetching: false

            }
        case GET_TEAMLEADS:
            return {
                ...state,
                teamleads: action.payload,
                isFetching: false
            }
        case ADD_TEAMLEAD:
            return {
                ...state,
                teamleads: [action.payload, ...state.teamleads],
                isFetching: false

            }
        case ADD_DSAT_CODE1:
            return {
                ...state,
                dsat_code1: [action.payload, ...state.dsat_code1],
                isFetching: false

            }
        case ADD_BB_DRIVER_CODE2:
            return {
                ...state,
                bb_driver_code2: [action.payload, ...state.bb_driver_code2],
                isFetching: false

            }
        case ADD_BB_DRIVER_CODE3:
            return {
                ...state,
                bb_driver_code3: [action.payload, ...state.bb_driver_code3],
                isFetching: false

            }                                  
        default:
            return state;
    }
};

export default surveyReducer;
