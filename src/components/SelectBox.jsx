import { Form } from "react-bootstrap";
import React from "react";

function SelectBox({ onChange, selectItem }) {
  return (
    <Form.Select onChange={onChange}>
      {selectItem.map((item) => (
        <option key={item.val} value={item.val}>
          {item.innerText}
        </option>
      ))}
    </Form.Select>
  );
}

export default SelectBox;
