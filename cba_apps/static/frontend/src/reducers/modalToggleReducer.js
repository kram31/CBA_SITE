import { MODAL_TOGGLE } from "../actions/types";

const initialState = {
    isOpen: false
};

const modalToggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_TOGGLE:
            return {
                isOpen: !state.isOpen
            };

        default:
            return state;
    }
};

export default modalToggleReducer;
