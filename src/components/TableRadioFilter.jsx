import React from "react";
import { useDispatch } from "react-redux";

function TableRadioFilter({ list, checkVal, category, checkFilter }) {
  const dispatch = useDispatch();

  return (
    <form onClick={(e) => e.stopPropagation()}>
      {list.map((item) => (
        <div key={item}>
          <label htmlFor={item}>
            <input
              type="radio"
              name="gender"
              id={item}
              value={item}
              defaultChecked={item === checkVal}
              onChange={(e) => dispatch(checkFilter(category, e.target.value))}
            />
            {item}
          </label>
        </div>
      ))}
    </form>
  );
}
export default TableRadioFilter;
