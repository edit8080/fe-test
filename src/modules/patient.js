import { getPatients } from "@apis/patient";

const LOADING = "patient/PATIENT_LOADING";
const PATIENT_FETCH = "patient/PATIENT_FETCH";
const ERROR = "patient/PATIENT_ERROR";

export const fetchPatients = (filters) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const patientsData = await getPatients(filters);

    dispatch({ type: PATIENT_FETCH, ...patientsData.patient });
  } catch (e) {
    dispatch({ type: ERROR, error: e });
  }
};

const initialState = {
  loading: false,
  dataList: [],
  page: 1,
  totalLength: 0,
  error: false,
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case PATIENT_FETCH:
      return {
        loading: false,
        dataList: action.list,
        page: action.page,
        totalLength: action.totalLength,
        error: false,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };
    default:
      return state;
  }
}
