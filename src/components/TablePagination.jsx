import { Pagination } from "react-bootstrap";
import React from "react";

function TablePagination() {
  let active = 1;
  let items = [];

  for (let number = 1; number <= 10; number++)
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {items}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default TablePagination;
