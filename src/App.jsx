import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import PatientChartSet from "@components/PatientChartSet";
import PatientPageSelectBox from "@components/PatientPageSelectBox";
import PatientTable from "@components/PatientTable";
import { fetchChartStats } from "@modules/chartStats";
import { fetchFilterList } from "@modules/filterList";
import { fetchPatients } from "@modules/patient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const { dataList, page, length, totalLength } = useSelector(
    (state) => state.patientReducer
  );
  const { filterList } = useSelector((state) => state.filterListReducer);
  const { stats } = useSelector((state) => state.chartStatsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPatients({
        page: 1,
        length: 10,
      })
    );

    dispatch(fetchFilterList());
    dispatch(fetchChartStats());
  }, [dispatch]);

  return (
    <div className="App">
      <Container className="d-flex">
        <PatientChartSet filterList={filterList} stats={stats} />
      </Container>
      <Container>
        <PatientPageSelectBox page={page} />
        <PatientTable
          data={dataList}
          page={page}
          length={length}
          pageCnt={Math.ceil(totalLength / length)}
        />
      </Container>
    </div>
  );
}

export default App;
