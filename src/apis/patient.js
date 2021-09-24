import axios from "axios";

/**
 * 쿼리에 기반하여 환자 정보 GET
 *
 * @param {Object} filters 환자 리스트 쿼리
 * @returns {Object} list : 환자 정보 / page : 페이지 크기 / totalLength : 전체 데이터 길이
 */
export const getPatients = async (filters) => {
  try {
    let querySet = [];
    Object.keys(filters).map(
      (key) =>
        key && filters[key] !== "" && querySet.push(`${key}=${filters[key]}`)
    );

    let query = querySet.join("&");

    const patients = await axios.get(
      `${process.env.API_SERVER}/api/patient/list?${query}`
    );

    return patients.data;
  } catch (e) {
    throw new Error("환자 리스트 Fetch 실패");
  }
};
