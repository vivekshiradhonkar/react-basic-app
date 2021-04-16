import React from "react";

const Dropdown = (props) => {
  const items = props.items.map((item) => (
    <option key={item.value} value={item.value}>
      {item.name}
    </option>
  ));

  return (
    <div>
      <div className="form-control">
        <label htmlFor={props.name}>{props.label}</label>
        <select
          id={props.name}
          name={props.name}
          value={props.value}
          onChange={(event) => props.change(event)}
        >
          <option value=""> - Select - </option>
          {items}
        </select>
        {props.error !== "" && <p className="error-text">{props.error}</p>}
      </div>
    </div>
  );
};

export default Dropdown;
