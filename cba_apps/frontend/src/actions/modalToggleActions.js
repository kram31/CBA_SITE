import { MODAL_TOGGLE } from "./types";

export const toggle = () => dispatch => {
    dispatch({
        type: MODAL_TOGGLE
    });
};
