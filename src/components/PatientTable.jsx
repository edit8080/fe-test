import DataTable from "@components/DataTable";
import React from "react";
import TablePagination from "./TablePagination";
import { fetchPatients } from "../modules/patient";
import { useDispatch } from "react-redux";

function PatientTable({ data, pageCnt }) {
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

  return (
    <>
      <DataTable categories={patientsCategory} data={data} keyID="personID" />
      <TablePagination
        pageCnt={pageCnt}
        changePage={(page) => dispatch(fetchPatients({ page }))}
      />
    </>
  );
}
export default PatientTable;
