import { combineReducers } from "redux";
import filterListReducer from "@modules/filterList";
import patientReducer from "@modules/patient";

const rootReducers = combineReducers({
  patientReducer,
  filterListReducer,
});

export default rootReducers;
