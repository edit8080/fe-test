import axios from "axios";

/**
 * 민족 리스트 GET
 *
 * @returns {Array} 민족 리스트
 */
export const getEthnicityList = async () => {
  try {
    const ethnicityList = await axios.get(
      `${process.env.API_SERVER}/api/ethnicity/list`
    );
    return ethnicityList.data;
  } catch (e) {
    throw new Error("민족 리스트 Fetch 실패");
  }
};
/**
 * 인종 리스트 GET
 *
 * @returns {Array} 인종 리스트
 */
export const getRaceList = async () => {
  try {
    const raceList = await axios.get(`${process.env.API_SERVER}/api/race/list`);
    return raceList.data;
  } catch (e) {
    throw new Error("인종 리스트 Fetch 실패");
  }
};
/**
 * 성별 리스트 GET
 *
 * @returns {Array} 성별 리스트
 */
export const getGenderList = async () => {
  try {
    const genderList = await axios.get(
      `${process.env.API_SERVER}/api/gender/list`
    );
    return genderList.data;
  } catch (e) {
    throw new Error("성별 리스트 Fetch 실패");
  }
};
