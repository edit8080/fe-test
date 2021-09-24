import React, { useCallback, useEffect, useState } from "react";

import { Pagination } from "react-bootstrap";

function TablePagination({ length, pageCnt }) {
  const [active, setActive] = useState(1);
  const [range, setRange] = useState(1);
  const [pageNums, setPageNums] = useState([]);

  const PAGE_RANGE = 10;

  useEffect(() => {
    setPageNums(orderArr());
  }, []);

  // 순서 배열 생성
  const orderArr = useCallback(() => {
    const start = (range - 1) * PAGE_RANGE + 1;
    const end = range * PAGE_RANGE;
    const maxVal = pageCnt;

    const arr = [];
    for (let i = start; i <= Math.min(end, maxVal); i++) arr.push(i);

    return arr;
  }, [pageCnt, range]);

  // 페이지 클릭 이벤트
  const pageClick = (e) => {
    const id = e.target.id;
    if (!id) return;

    switch (id) {
      case "firstPage":
        break;
      case "prevPage":
        break;
      case "numPage":
        break;
      case "nextPage":
        break;
      case "lastPage":
        break;
      default:
        return;
    }
  };

  return (
    <Pagination onClick={pageClick}>
      <Pagination.First id="firstPage" />
      <Pagination.Prev id="prevPage" />
      {pageNums.map((num) => (
        <Pagination.Item
          key={num}
          id="numPage"
          data-id={num}
          active={num === active}
        >
          {num}
        </Pagination.Item>
      ))}
      <Pagination.Next id="nextPage" />
      <Pagination.Last id="lastPage" />
    </Pagination>
  );
}

export default TablePagination;
