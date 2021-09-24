import { dateFormat } from "@utils/format";
import { getPatients } from "@apis/patient";

const LOADING = "patient/PATIENT_LOADING";
const PATIENT_FETCH = "patient/PATIENT_FETCH";
const ERROR = "patient/PATIENT_ERROR";

/**
 * 환자 정보를 GET하여 상태 관리
 *
 * @param {Objects} filters
 */
export const fetchPatients = (filters) => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const patientsData = await getPatients(filters);

    // 환자 정보 포맷팅
    patientsData.patient.list = patientsData.patient.list.map((item) => ({
      ...item,
      birthDatetime: dateFormat(item.birthDatetime),
      isDeath: item.isDeath ? "T" : "F",
    }));

    dispatch({
      type: PATIENT_FETCH,
      ...patientsData.patient,
      length: filters.length,
    });
  } catch (e) {
    dispatch({ type: ERROR, error: e });
  }
};

const initialState = {
  loading: false,
  dataList: [],
  page: 1,
  length: 10,
  totalLength: 10,
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
        length: action.length,
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
