import React from "react";
import { Table } from "react-bootstrap";
import TablePagination from "@components/TablePagination";

function DataTable({ categories, data, keyID }) {
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            {Object.keys(categories).map((key, idx) => (
              <th key={idx}>{categories[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => {
            return (
              <tr key={d[keyID]}>
                <td>{idx + 1}</td>
                {Object.keys(categories).map((key, idx) => (
                  <td key={idx}>{d[key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TablePagination />
    </>
  );
}

export default DataTable;
