import React from "react";
import { Table } from "react-bootstrap";

function DataTable({ categories, data, keyID, theadSort }) {
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead onClick={theadSort}>
          <tr>
            <th data-id="num">#</th>
            {categories.map((category, idx) => (
              <th key={idx} data-id={category.val}>
                {category.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => {
            return (
              <tr key={d[keyID]}>
                <td>{idx + 1}</td>
                {categories.map((category, idx) => (
                  <td key={idx}>{d[category.attr]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default DataTable;
