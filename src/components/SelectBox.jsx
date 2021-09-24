import { Form } from "react-bootstrap";
import React from "react";

function SelectBox({ selectVal }) {
  return (
    <Form.Select>
      {selectVal.map((item) => (
        <option key={item.val} val={item.val}>
          {item.innerText}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectBox;
