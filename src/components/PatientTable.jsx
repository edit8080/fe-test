import React, { useCallback, useState } from "react";

import DataTable from "@components/DataTable";
import TablePagination from "./TablePagination";
import { fetchPatients } from "../modules/patient";
import { useDispatch } from "react-redux";

function PatientTable({ data, page, length, pageCnt }) {
  const dispatch = useDispatch();
  const [befOrderCol, setbefOrderCol] = useState("");
  const [toggle, setToggle] = useState(true);

  const patientsCategory = [
    {
      attr: "personID",
      text: "환자 ID",
      val: "person_id",
    },
    {
      attr: "gender",
      text: "성별",
      val: "gender",
    },
    {
      attr: "birthDatetime",
      text: "생년월일",
      val: "birth",
    },
    {
      attr: "race",
      text: "인종",
      val: "race",
    },
    {
      attr: "ethnicity",
      text: "민족",
      val: "ethnicity",
    },
    {
      attr: "isDeath",
      text: "사망 여부",
      val: "death",
    },
  ];

  const theadSort = useCallback(
    (e) => {
      const orderCol = e.target.dataset.id;

      if (orderCol === "num") return;

      befOrderCol === orderCol ? setToggle(!toggle) : setToggle(true);
      dispatch(
        fetchPatients({
          page,
          length,
          order_column: orderCol,
          order_desc: toggle,
        })
      );
      setbefOrderCol(orderCol);
    },
    [befOrderCol, dispatch, length, page, toggle]
  );

  return (
    <>
      <DataTable
        categories={patientsCategory}
        data={data}
        keyID="personID"
        theadSort={theadSort}
      />
      <TablePagination
        length={length}
        pageCnt={pageCnt}
        changePage={(filter) => dispatch(fetchPatients(filter))}
      />
    </>
  );
}
export default PatientTable;
