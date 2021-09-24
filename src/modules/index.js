import { combineReducers } from "redux";
import patientReducer from "@modules/patient";

const rootReducers = combineReducers({
  patientReducer,
});

export default rootReducers;
