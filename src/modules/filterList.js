import { getEthnicityList, getGenderList, getRaceList } from "@apis/filterList";

const LOADING = "filterList/FILTER_LIST_LOADING";
const FILTER_LIST_FETCH = "filterList/FILTER_LIST_FETCH";
const FILTER_CHECK = "filterList/FILTER_CHECK";
const ERROR = "filterList/FILTER_LIST_ERROR";

// 필터 리스트 관리
export const fetchFilterList = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING });

    const gender = await getGenderList();
    const race = await getRaceList();
    const ethnicity = await getEthnicityList();
    const isDeathList = ["Y", "N"];

    dispatch({
      type: FILTER_LIST_FETCH,
      filterList: { ...gender, ...race, ...ethnicity, isDeathList },
    });
  } catch (e) {
    dispatch({ type: ERROR, error: e });
  }
};

/**
 * 필터 리스트 선택 값 관리
 *
 * @param {String} category 필터 카테고리
 * @param {String} value 선택한 필터 값
 */
export const checkFilter = (category, value) => {
  let obj = {};
  obj[category] = value;

  return { type: FILTER_CHECK, check: obj };
};

const initialState = {
  loading: false,
  filterList: {
    genderList: [],
    raceList: [],
    ethnicityList: [],
    isDeathList: [],
  },
  filterVal: {
    gender: "",
    age_min: 0,
    age_max: 200,
    race: "",
    ethnicity: "",
    death: "",
  },
  error: false,
};

export default function filterListReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case FILTER_LIST_FETCH:
      return {
        ...state,
        loading: false,
        filterList: action.filterList,
        error: false,
      };
    case FILTER_CHECK:
      return {
        ...state,
        filterVal: {
          ...state.filterVal,
          ...action.check,
        },
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
