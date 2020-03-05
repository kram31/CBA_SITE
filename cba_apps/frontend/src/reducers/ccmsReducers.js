import {
    FETCHING_CCMS,
    STOP_FETCHING_CCMS,
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
    CLOSE_RCA_MODAL,
    COMPLETE_CCMS_RCA,
    TOGGLE_ACTIVE_TAB,
    COMPLETE_FNI,
    GET_FNI_LIST,
    SUBMIT_CA,
    GET_CA_LIST,
    GET_SELECTED_CCMS_ONLY,
    ADD_BUSINESS_UNIT,
    DELETE_BUSINESS_UNIT,
    EDIT_BUSINESS_UNIT,
    ADD_TICKET_TYPE,
    DELETE_TICKET_TYPE,
    EDIT_TICKET_TYPE,
    ADD_SILO,
    DELETE_SILO,
    EDIT_SILO,
    ADD_CCMS_STATUS,
    DELETE_CCMS_STATUS,
    EDIT_CCMS_STATUS,
    ADD_SITE_CODE,
    DELETE_SITE_CODE,
    EDIT_SITE_CODE,
    ADD_ACCOUNTABLE_TEAM,
    DELETE_ACCOUNTABLE_TEAM,
    EDIT_ACCOUNTABLE_TEAM,
    ADD_ESCALATION_TYPE,
    DELETE_ESCALATION_TYPE,
    EDIT_ESCALATION_TYPE,
    COMPLETE_CCMS,
    SET_TABLE_PAGE,
    DENY_REQUEST_ACCESS,
    GET_ALL_DATA_CCMS
} from "../actions/types";

const initialState = {
    page: 0,
    search: "",
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
    users_list: null,
    modal: false,
    is_fetching_comments: false,
    access_request: null,
    cause_code: null,
    escalation_driver: null,
    escalation_driver_cause: null,
    ccms_rca: null,
    ccms_rca_modal: false,
    activeTab: 1,
    fni: null,
    ca: null
};

const ccmsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DATA_CCMS:
            const {
                users,
                group,
                silo,
                ticket_type,
                ccms_status,
                ccms_owner,
                site_code,
                accountable_team,
                escalation_type,
                ticket_status,
                business_unit,
                ccms,
                cause_code,
                escalation_driver,
                escalation_driver_cause
            } = action.payload;
            return {
                ...state,
                users_list: users,
                ccms_admin_list: group,
                silo,
                ticket_type,
                ccms_status,
                ccms_owner,
                site_code,
                accountable_team,
                escalation_type,
                ticket_status,
                business_unit,
                ccms_list: ccms,
                cause_code,
                escalation_driver,
                escalation_driver_cause
            };
        case SET_TABLE_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case SEARCH:
            return {
                ...state,
                filtered_ccms_list: state.ccms_list.filter(
                    item =>
                        action.payload == item.id ||
                        action.payload == item.escalated_ticket ||
                        action.payload == item.escalated_email_address ||
                        action.payload == item.escalated_name
                ),
                search: action.payload
            };
        case EDIT_ESCALATION_TYPE:
            return {
                ...state,
                escalation_type: update_list(
                    state.escalation_type,
                    action.payload
                )
            };
        case ADD_ESCALATION_TYPE:
            return {
                ...state,
                escalation_type: [action.payload, ...state.escalation_type]
            };
        case DELETE_ESCALATION_TYPE:
            return {
                ...state,
                escalation_type: removeItemFromList(
                    state.escalation_type,
                    action.payload
                )
            };
        case EDIT_ACCOUNTABLE_TEAM:
            return {
                ...state,
                accountable_team: update_list(
                    state.accountable_team,
                    action.payload
                )
            };
        case ADD_ACCOUNTABLE_TEAM:
            return {
                ...state,
                accountable_team: [action.payload, ...state.accountable_team]
            };
        case DELETE_ACCOUNTABLE_TEAM:
            return {
                ...state,
                accountable_team: removeItemFromList(
                    state.accountable_team,
                    action.payload
                )
            };
        case EDIT_SITE_CODE:
            return {
                ...state,
                site_code: update_list(state.site_code, action.payload)
            };
        case ADD_SITE_CODE:
            return {
                ...state,
                site_code: [action.payload, ...state.site_code]
            };
        case DELETE_SITE_CODE:
            return {
                ...state,
                site_code: removeItemFromList(state.site_code, action.payload)
            };
        case EDIT_CCMS_STATUS:
            return {
                ...state,
                ccms_status: update_list(state.ccms_status, action.payload)
            };
        case ADD_CCMS_STATUS:
            return {
                ...state,
                ccms_status: [action.payload, ...state.ccms_status]
            };
        case DELETE_CCMS_STATUS:
            return {
                ...state,
                ccms_status: removeItemFromList(
                    state.ccms_status,
                    action.payload
                )
            };
        case EDIT_SILO:
            return {
                ...state,
                silo: update_list(state.silo, action.payload)
            };
        case ADD_SILO:
            return {
                ...state,
                silo: [action.payload, ...state.silo]
            };
        case DELETE_SILO:
            return {
                ...state,
                silo: removeItemFromList(state.silo, action.payload)
            };
        case EDIT_TICKET_TYPE:
            return {
                ...state,
                ticket_type: update_list(state.ticket_type, action.payload)
            };
        case ADD_TICKET_TYPE:
            return {
                ...state,
                ticket_type: [action.payload, ...state.ticket_type]
            };
        case DELETE_TICKET_TYPE:
            return {
                ...state,
                ticket_type: removeItemFromList(
                    state.ticket_type,
                    action.payload
                )
            };
        case EDIT_BUSINESS_UNIT:
            return {
                ...state,
                business_unit: update_list(state.business_unit, action.payload)
            };
        case ADD_BUSINESS_UNIT:
            return {
                ...state,
                business_unit: [action.payload, ...state.business_unit]
            };
        case DELETE_BUSINESS_UNIT:
            return {
                ...state,
                business_unit: removeItemFromList(
                    state.business_unit,
                    action.payload
                )
            };
        case GET_CA_LIST:
            return {
                ...state,
                ca: action.payload
            };
        case SUBMIT_CA:
            return {
                ...state,
                ca: [...state.ca, action.payload]
            };
        case GET_FNI_LIST:
            return {
                ...state,
                fni: action.payload
            };
        case COMPLETE_FNI:
            return {
                ...state,
                fni: [...state.fni, action.payload]
            };
        case TOGGLE_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload
            };
        case CLOSE_RCA_MODAL:
            return {
                ...state,
                ccms_rca_modal: false,
                ccms_rca: null,
                fni: null,
                ca: null
            };
        case COMPLETE_CCMS_RCA:
            return {
                ...state,
                ccms_rca: action.payload,
                ccms_list: state.ccms_list.map(ccms =>
                    ccms.id === action.payload.ccms
                        ? { ...ccms, is_rca_completed: true }
                        : ccms
                )
            };
        case GET_CCMS_RCA:
            return {
                ...state,
                ccms_rca: action.payload[0],
                ccms_rca_modal: true
            };
        case ADD_ESCALATION_DRIVER_CAUSE:
            return {
                ...state,
                escalation_driver_cause: [
                    ...state.escalation_driver_cause,
                    action.payload
                ]
            };
        case ADD_ESCALATION_DRIVER:
            return {
                ...state,
                escalation_driver: [...state.escalation_driver, action.payload]
            };
        case DELETE_ESCALATION_DRIVER_CAUSE:
            return {
                ...state,
                escalation_driver_cause: removeItemFromList(
                    state.escalation_driver_cause,
                    action.payload
                )
            };
        case DELETE_ESCALATION_DRIVER:
            return {
                ...state,
                escalation_driver: removeItemFromList(
                    state.escalation_driver,
                    action.payload
                )
            };
        case EDIT_ESCALATION_DRIVER_CAUSE:
            return {
                ...state,
                escalation_driver_cause: update_list(
                    state.escalation_driver_cause,
                    action.payload
                )
            };
        case EDIT_ESCALATION_DRIVER:
            return {
                ...state,
                escalation_driver: update_list(
                    state.escalation_driver,
                    action.payload
                )
            };
        case EDIT_CAUSE_CODE:
            return {
                ...state,
                cause_code: update_list(state.cause_code, action.payload)
            };
        case DELETE_CAUSE_CODE:
            return {
                ...state,
                cause_code: removeItemFromList(
                    state.cause_code,
                    action.payload
                ),
                escalation_driver: state.escalation_driver.filter(
                    item => item.cause_code != action.payload.id
                )
            };
        case ADD_CAUSE_CODE:
            return {
                ...state,
                cause_code: [...state.cause_code, action.payload]
            };
        case GET_ESCALATION_DRIVER_CAUSE:
            return {
                ...state,
                escalation_driver_cause: action.payload
            };
        case GET_ESCALATION_DRIVER:
            return {
                ...state,
                escalation_driver: action.payload
            };
        case GET_CAUSE_CODE:
            return {
                ...state,
                cause_code: action.payload
            };
        case REMOVE_ACCESS_REQUEST:
            return {
                ...state,
                access_request: state.access_request.filter(
                    item => item.id != action.payload.id
                )
            };
        case ADD_CCMS_OWNER:
            return {
                ...state,
                ccms_owner: [...state.ccms_owner, action.payload]
            };
        case GET_REQUEST_ACCESS:
            return {
                ...state,
                access_request:
                    action.payload.length != 0 ? action.payload : null
            };
        case DENY_REQUEST_ACCESS:
            return {
                ...state,
                access_request: removeItemFromList(
                    state.access_request,
                    action.payload
                )
            };
        case ADD_REQUEST_ACCESS:
            return {
                ...state,
                access_request: [action.payload, ...state.access_request]
            };
        case FETCHING_COMMENTS:
            return {
                ...state,
                is_fetching_comments: true
            };
        case OPEN_MODAL:
            return {
                ...state,
                modal: true
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modal: false,
                selected_ccms: null,
                comments: []
            };
        case TOGGLE_MODAL:
            return {
                ...state,
                modal: !state.modal
            };
        case FETCHING_CCMS:
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
        case STOP_FETCHING_CCMS:
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

                ccms_admin_list: [...state.ccms_admin_list, action.payload]
            };
        case REMOVE_USER_FROM_CCMS_ADMIN:
            return {
                ...state,
                ccms_admin_list: state.ccms_admin_list.filter(
                    item => item.id != action.payload.id
                )

                // users_list: [...state.users_list, action.payload]
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
                selected_ccms: action.payload.selected_ccms,
                comments: action.payload.comments,
                is_fetching_comments: false,
                modal: true
            };
        case GET_SELECTED_CCMS_ONLY:
            return {
                ...state,
                selected_ccms: action.payload
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
                comments: action.payload,
                is_fetching_comments: false
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
        case COMPLETE_CCMS:
            // console.log(action.payload);
            return {
                ...state,
                ccms_list: update_list(
                    state.ccms_list,
                    action.payload.completed_ccms
                ),
                selected_ccms: action.payload.completed_ccms,
                comments: [...state.comments, action.payload.comment],
                isFetching: false
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

const removeItemFromList = (list, new_entry) =>
    list.filter(item => item.id != new_entry.id);

export default ccmsReducer;
