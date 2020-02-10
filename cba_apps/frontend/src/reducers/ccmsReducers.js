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
    ADD_USER_TO_CCMS_ADMIN
} from "../actions/types";

const initialState = {
    ccms_list: [],
    isFetching: false,
    comments: [],
    business_unit: null,
    ticket_status: null,
    escalation_type: null,
    accountable_team: null,
    site_code: null,
    ccms_owner: null,
    ccms_status: null,
    ticket_type: null,
    silo: null,
    selected_ccms: null,
    ccms_list_per_user: null,
    collapse: false,
    filtered_ccms_list: [],
    ccms_admin_list: null,
    users_list: null
};

const ccmsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                filtered_ccms_list: state.ccms_list.filter(
                    item =>
                        action.payload == item.id ||
                        action.payload == item.escalated_ticket ||
                        action.payload == item.escalated_email_address ||
                        action.payload == item.escalated_name
                )
            };
        case FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case GET_USERS_LIST:
            return {
                ...state,
                users_list: action.payload
            };
        case GET_CCMS_ADMIN_LIST:
            return {
                ...state,
                ccms_admin_list: action.payload
            };
        case CLOSE_COLLAPSE:
            return {
                ...state,
                collapse: false
            };
        case OPEN_COLLAPSE:
            return {
                ...state,
                collapse: true
            };
        case STOP_FETCHING:
            return {
                ...state,
                isFetching: false
            };
        case GET_CCMS_LIST_PER_USER:
            return {
                ...state,
                ccms_list_per_user: action.payload
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
                selected_ccms: {
                    ...state.selected_ccms,
                    ccms_status: action.payload.ccms.ccms_status
                }
            };
        case ADD_USER_TO_CCMS_ADMIN:
            return {
                ...state,
                users_list: state.users_list.filter(
                    item => item.id != action.payload.id
                ),
                ccms_admin_list: [...state.ccms_admin_list, action.payload]
            };
        case REMOVE_USER_FROM_CCMS_ADMIN:
            return {
                ...state,
                ccms_admin_list: state.ccms_admin_list.filter(
                    item => item.id != action.payload.id
                ),
                users_list: [...state.users_list, action.payload]
            };
        case REMOVE_SELECTED_CCMS:
            return {
                ...state,
                selected_ccms: null,
                collapse: false
            };
        case GET_SELECTED_CCMS:
            return {
                ...state,
                selected_ccms: action.payload,
                collapse: true
            };
        case GET_SILO:
            return {
                ...state,
                silo: action.payload
            };
        case GET_TICKET_TYPE:
            return {
                ...state,
                ticket_type: action.payload
            };
        case GET_CCMS_STATUS:
            return {
                ...state,
                ccms_status: action.payload
            };
        case GET_CCMS_OWNER:
            return {
                ...state,
                ccms_owner: action.payload
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
        case UPDATE_CCMS:
            // console.log(action.payload);
            return {
                ...state,
                ccms_list: update_list(state.ccms_list, action.payload),
                selected_ccms: action.payload
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

const update_list = (list, new_entry) =>
    list.map(item => (item.id == new_entry.id ? new_entry : item));

export default ccmsReducer;
