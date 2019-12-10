import { combineReducers } from "redux";
import surveyReducer from "./surveyReducer";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import modalToggleReducer from "./modalToggleReducer";
import ccmsReducers from "./ccmsReducers";

export default combineReducers({
    surveys: surveyReducer,
    modal: modalToggleReducer,
    errors,
    auth,
    messages,
    ccms: ccmsReducers
});
