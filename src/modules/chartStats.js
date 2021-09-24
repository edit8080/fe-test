import { getChartStats } from "@apis/chartStats";

const LOADING = "chartStats/CHART_STATS_LOADING";
const CHART_STATS_FETCH = "chartStats/CHART_STATS_FETCH";
const ERROR = "chartStats/CHART_STATS_ERROR";

// 차트 정보 관리
export const fetchChartStats = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING });
    const chartStats = await getChartStats();

    dispatch({
      type: CHART_STATS_FETCH,
      ...chartStats,
    });
  } catch (e) {
    dispatch({ type: ERROR, error: e });
  }
};

const initialState = {
  loading: false,
  stats: [],
  error: null,
};

export default function chartStatsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case CHART_STATS_FETCH:
      return {
        loading: false,
        stats: action.stats,
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
