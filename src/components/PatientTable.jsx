import DataTable from "./DataTable";
import React from "react";

function PatientTable({ data }) {
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
    <DataTable categories={patientsCategory} data={data} keyID="personID" />
  );
}
export default PatientTable;
