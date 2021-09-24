import React, { useEffect } from "react";

import PatientPageSelectBox from "@components/PatientPageSelectBox";
import PatientTable from "@components/PatientTable";
import { fetchPatients } from "@modules/patient";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const { loading, dataList, page, length, totalLength, error } = useSelector(
    (state) => state.patientReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchPatients({
        page: 1,
        length: 10,
      })
    );
  }, [dispatch]);

  return (
    <div className="App">
      <PatientPageSelectBox page={page} />
      <PatientTable
        data={dataList}
        length={length}
        pageCnt={Math.ceil(totalLength / length)}
      />
    </div>
  );
}

export default App;
