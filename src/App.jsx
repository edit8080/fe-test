import React, { useEffect } from "react";

import DataTable from "@components/DataTable";
import SelectBox from "@components/SelectBox";
import { fetchPatients } from "@modules/patient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const { loading, dataList, page, error } = useSelector(
    (state) => state.patientReducer
  );
  const dispatch = useDispatch();

  const patientsCategory = {
    personID: "환자 ID",
    gender: "성별",
    birthDatetime: "생년월일",
    age: "나이",
    race: "인종",
    ethnicity: "민족",
    isDeath: "사망 여부",
  };

  const selectVal = [
    { val: 10, innerText: "10개씩 보이기" },
    { val: 20, innerText: "20개씩 보이기" },
    { val: 30, innerText: "30개씩 보이기" },
  ];

  useEffect(() => {
    dispatch(
      fetchPatients({
        page: 1,
        length: 20,
      })
    );
  }, [dispatch]);

  return (
    <div className="App">
      <SelectBox selectVal={selectVal} />
      <DataTable
        categories={patientsCategory}
        data={dataList}
        keyID="personID"
      />
    </div>
  );
}

export default App;
