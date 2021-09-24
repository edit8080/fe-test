import React, { useCallback, useEffect, useState } from "react";

import { Pagination } from "react-bootstrap";

function TablePagination({ length, pageCnt, changePage, filterVal }) {
  const [active, setActive] = useState(1); // 현재 활성화된 페이지
  const [range, setRange] = useState(1); // 페이지 범위
  const [pageNums, setPageNums] = useState([]); // 페이지 번호

  const PAGE_RANGE = 10; // 페이지 번호 개수

  // 순서 배열 생성
  const orderArr = useCallback(() => {
    const start = (range - 1) * PAGE_RANGE + 1;
    const end = range * PAGE_RANGE;
    const maxVal = pageCnt;

    const arr = [];
    for (let i = start; i <= Math.min(end, maxVal); i++) arr.push(i);

    return arr;
  }, [pageCnt, range]);

  useEffect(() => {
    setPageNums(orderArr());
  }, [orderArr]);

  // 변경된 페이지에 따른 데이터 Fetch
  useEffect(() => {
    changePage({
      page: active,
      length,
      ...filterVal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, length, filterVal]);

  // << 클릭
  const firstPageClick = useCallback(() => {
    setRange(1);
    setActive(1);
    setPageNums(orderArr());
  }, [orderArr]);

  // < 클릭
  const prevPageClick = useCallback(() => {
    if (range === 1) return;

    setActive((range - 2) * PAGE_RANGE + 1);
    setRange(range - 1);
    setPageNums(orderArr());
  }, [orderArr, range]);

  // 숫자 클릭
  const numPageClick = useCallback((e) => {
    setActive(parseInt(e.target.dataset.id));
  }, []);

  // > 클릭
  const nextPageClick = useCallback(() => {
    if (range === parseInt((pageCnt - 1) / PAGE_RANGE) + 1) return;

    setActive(range * PAGE_RANGE + 1);
    setRange(range + 1);
    setPageNums(orderArr());
  }, [orderArr, pageCnt, range]);

  // >> 클릭
  const lastPageClick = useCallback(() => {
    const endRange = parseInt((pageCnt - 1) / PAGE_RANGE) + 1;

    setRange(endRange);
    setActive(pageCnt);
    setPageNums(orderArr());
  }, [pageCnt, orderArr]);

  // 페이지 버튼 클릭 이벤트
  const pageClick = useCallback(
    (e) => {
      const pageBtn = e.target.closest("a");
      if (!pageBtn) return;

      switch (pageBtn.id) {
        case "firstPage":
          firstPageClick();
          break;
        case "prevPage":
          prevPageClick();
          break;
        case "numPage":
          numPageClick(e);
          break;
        case "nextPage":
          nextPageClick();
          break;
        case "lastPage":
          lastPageClick();
          break;
        default:
          return;
      }
    },
    [firstPageClick, prevPageClick, numPageClick, nextPageClick, lastPageClick]
  );

  return (
    <Pagination onClick={pageClick}>
      <Pagination.First id="firstPage" />
      <Pagination.Prev id="prevPage" />
      {pageNums.map((num) => (
        <Pagination.Item
          key={num}
          id="numPage"
          data-id={num}
          active={parseInt(num) === active}
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
