import React, { useCallback } from "react";

import SelectBox from "@components/SelectBox";
import { fetchPatients } from "../modules/patient";
import { useDispatch } from "react-redux";

/**
 * 선택 박스를 통해 환자 데이터 페이지 길이 설정
 *
 * @param {Object} props - page : 페이지 번호, selectItem : 선택 박스 항목
 * @returns {HTMLElement} 환자 데이터 페이지 선택 박스
 */
function PatientPageSelectBox({ page, selectItem }) {
  const dispatch = useDispatch();

  const pageChange = useCallback(
    (e) => {
      dispatch(
        fetchPatients({
          page,
          length: e.target.value,
        })
      );
    },
    [page, dispatch]
  );

  return <SelectBox onChange={pageChange} selectItem={selectItem} />;
}
export default PatientPageSelectBox;
