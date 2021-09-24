import React, { useEffect, useState } from "react";

import DataPieChart from "@components/DataPieChart";
import { singleCount } from "@utils/chartCount";

function PatientChartSet({ filterList, stats }) {
  const [categoryCnt, setCategoryCnt] = useState({
    genderCnt: [],
    raceCnt: [],
    ethnicityCnt: [],
    genderNraceCnt: [],
    genderNethnicityCnt: [],
  });

  useEffect(() => {
    setCategoryCnt({
      genderCnt: singleCount(filterList.genderList, stats, "gender"),
      raceCnt: singleCount(filterList.raceList, stats, "race"),
      ethnicityCnt: singleCount(filterList.ethnicityList, stats, "ethnicity"),
    });
  }, [filterList, stats]);

  return Object.keys(categoryCnt).map((key) => (
    <DataPieChart
      key={`chart-${key}`}
      data={categoryCnt[key]}
      dataKey="value"
    />
  ));
}

export default PatientChartSet;
