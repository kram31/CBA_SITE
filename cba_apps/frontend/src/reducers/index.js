import { combineReducers } from "redux";
import surveyReducer from "./surveyReducer";
import modalToggleReducer from "./modalToggleReducer";

export default combineReducers({
    surveys: surveyReducer,
    modal: modalToggleReducer,
});
