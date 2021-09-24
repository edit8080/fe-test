import { OverlayTrigger, Popover, Table } from "react-bootstrap";

import React from "react";

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
                {category.filter && (
                  <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover>
                        <Popover.Body>{category.filter}</Popover.Body>
                      </Popover>
                    }
                  >
                    <span>📌</span>
                  </OverlayTrigger>
                )}
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
