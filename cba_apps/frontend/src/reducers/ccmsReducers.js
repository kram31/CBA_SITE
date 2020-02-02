import {
    FETCHING,
    STOP_FETCHING,
    ACK_ENTRY,
    ADD_UPDATE,
    GET_COMMENTS,
    GET_CCMS,
    GET_BUSINESS_UNIT,
    GET_TICKET_STATUS,
    GET_ESCALATION_TYPE,
    GET_ACCOUNTABLE_TEAM,
    GET_SITE_CODE
} from "../actions/types";

const initialState = {
    ccms_list: [],
    isFetching: false,
    comments: [],
    business_unit: null,
    ticket_status: null,
    escalation_type: null,
    accountable_team: null,
    site_code: null
};

const ccmsReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case GET_SITE_CODE:
            return {
                ...state,
                site_code: action.payload
            };
        case GET_ACCOUNTABLE_TEAM:
            return {
                ...state,
                accountable_team: action.payload
            };
        case GET_ESCALATION_TYPE:
            return {
                ...state,
                escalation_type: action.payload
            };
        case GET_TICKET_STATUS:
            return {
                ...state,
                ticket_status: action.payload
            };
        case GET_BUSINESS_UNIT:
            return {
                ...state,
                business_unit: action.payload
            };
        case GET_CCMS:
            // console.log(action.payload);
            return {
                ...state,
                ccms_list: action.payload
            };
        case GET_COMMENTS:
            // console.log(action.payload);
            return {
                ...state,
                comments: action.payload
            };
        case ACK_ENTRY:
            // console.log(action.payload);
            return {
                ...state,
                ccms_list: state.ccms_list.map(item => {
                    if (item.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                })
            };
        case ADD_UPDATE:
            // console.log(action.payload);
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };

        default:
            return state;
    }
};

export default ccmsReducer;
