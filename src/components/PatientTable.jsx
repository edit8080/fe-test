import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "react-bootstrap";
import DataTable from "@components/DataTable";
import TablePagination from "@components/TablePagination";
import TableRadioFilter from "@components/TableRadioFilter";
import { checkFilter } from "@modules/filterList";
import { fetchPatients } from "@modules/patient";

function PatientTable({ data, page, length, pageCnt }) {
  const {
    filterList: { genderList, raceList, ethnicityList, isDeathList },
    filterVal,
  } = useSelector((state) => state.filterListReducer);

  const dispatch = useDispatch();

  const [befOrderCol, setbefOrderCol] = useState("");
  const [toggle, setToggle] = useState(true);

  // 변경된 필터값으로 데이터 Fetch
  useEffect(() => {
    dispatch(
      fetchPatients({
        page,
        length,
        ...filterVal,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterVal]);

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
          checkVal={filterVal.gender}
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
            defaultValue={filterVal.age_min}
            onChange={(e) => dispatch(checkFilter("age_min", e.target.value))}
          />
          ~
          <input
            type="number"
            id="maxAge"
            defaultValue={filterVal.age_max}
            onChange={(e) => dispatch(checkFilter("age_max", e.target.value))}
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
          checkVal={filterVal.race}
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
          checkVal={filterVal.ethnicity}
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
          checkVal={filterVal.death}
          category="death"
          checkFilter={checkFilter}
        />
      ),
    },
  ];

  // 표 정렬 기능 (헤더 클릭)
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
          ...filterVal,
        })
      );
      setbefOrderCol(orderCol);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [befOrderCol, toggle, filterVal]
  );

  return (
    <>
      <DataTable
        categories={patientsCategory}
        data={data}
        keyID="personID"
        theadSort={theadSort}
      />
      <Container className="d-flex justify-content-center">
        <TablePagination
          length={length}
          pageCnt={pageCnt}
          changePage={(filter) => dispatch(fetchPatients(filter))}
          filterVal={filterVal}
        />
      </Container>
    </>
  );
}
export default PatientTable;
