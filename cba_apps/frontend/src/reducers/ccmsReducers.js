import { GET_MAILS, FETCHING, STOP_FETCHING } from "../actions/types";

const initialState = {
    mails: [],
    isFetching: false
};

const ccmsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case STOP_FETCHING:
            console.log("working");
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
        default:
            return state;
    }
};

export default ccmsReducer;
