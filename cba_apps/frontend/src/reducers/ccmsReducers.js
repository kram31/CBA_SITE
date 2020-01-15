import {
    GET_MAILS,
    FETCHING,
    STOP_FETCHING,
    ACK_ENTRY,
    ADD_UPDATE,
    GET_COMMENTS
} from "../actions/types";

const initialState = {
    mails: [],
    isFetching: false,
    comments: []
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
        case GET_MAILS:
            // console.log(action.payload);
            return {
                ...state,
                mails: action.payload
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
                mails: state.mails.map(item => {
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
                mails: state.mails.map(item => {
                    if (item.id == action.payload.id) {
                        return action.payload;
                    } else {
                        return item;
                    }
                })
            };
        default:
            return state;
    }
};

export default ccmsReducer;
