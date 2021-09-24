import axios from "axios";

/**
 * 차트 정보 GET
 *
 * @returns {Array} 차트 정보
 */
export const getChartStats = async () => {
  try {
    const chartStats = await axios.get(
      `${process.env.API_SERVER}/api/patient/stats`
    );
    return chartStats.data;
  } catch (e) {
    throw new Error("차트 정보 Fetch 실패");
  }
};
