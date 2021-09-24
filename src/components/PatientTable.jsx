import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@components/DataTable";
import TablePagination from "@components/TablePagination";
import TableRadioFilter from "@components/TableRadioFilter";
import { checkFilter } from "@modules/filterList";
import { fetchPatients } from "@modules/patient";

function PatientTable({ data, page, length, pageCnt }) {
  const {
    filterList: { genderList, raceList, ethnicityList, isDeathList },
    checkVal: { gender, minAge, maxAge, race, ethnicity, isDeath },
  } = useSelector((state) => state.filterListReducer);

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
      filter: (
        <TableRadioFilter
          list={genderList}
          checkVal={gender}
          category="gender"
          checkFilter={checkFilter}
        />
      ),
    },
    {
      attr: "birthDatetime",
      text: "생년월일",
      val: "birth",
    },
    {
      attr: "age",
      text: "나이",
      val: "age",
      filter: (
        <form>
          <input
            type="number"
            id="minAge"
            defaultValue={minAge}
            onChange={(e) => dispatch(checkFilter("minAge", e.target.value))}
          />
          ~
          <input
            type="number"
            id="maxAge"
            defaultValue={maxAge}
            onChange={(e) => dispatch(checkFilter("maxAge", e.target.value))}
          />
        </form>
      ),
    },
    {
      attr: "race",
      text: "인종",
      val: "race",
      filter: (
        <TableRadioFilter
          list={raceList}
          checkVal={race}
          category="race"
          checkFilter={checkFilter}
        />
      ),
    },
    {
      attr: "ethnicity",
      text: "민족",
      val: "ethnicity",
      filter: (
        <TableRadioFilter
          list={ethnicityList}
          checkVal={ethnicity}
          category="ethnicity"
          checkFilter={checkFilter}
        />
      ),
    },
    {
      attr: "isDeath",
      text: "사망 여부",
      val: "death",
      filter: (
        <TableRadioFilter
          list={isDeathList}
          checkVal={isDeath}
          category="isDeath"
          checkFilter={checkFilter}
        />
      ),
    },
  ];

  const theadSort = useCallback(
    (e) => {
      const thead = e.target.closest("th");
      if (!thead) return;

      const orderCol = thead.dataset.id;
      if (orderCol === "num" || orderCol === "age") return;

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
