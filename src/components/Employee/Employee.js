import React, { Component } from "react";

import EmployeeForm from "./EmployeeForm";
import DataGrid from "../DataGrid/DataGrid";
import Dropdown from "./Dropdown";
import "./style.css";

const cols = [
  { title: "Employee No", field: "employeeNo" },
  { title: "Employee Name", field: "employeeName" },
  { title: "Salary", field: "salary" },
  { title: "Dept Name", field: "deptName" },
  { title: "Designation", field: "designation" },
];
let sortByCols = cols.map((key, id) => {
  return {
    name: key.title,
    value: key.field,
  };
});
export class Employee extends Component {
  state = {
    employee: [],
    canDeleteRow: false,
    sortByKey: "",
  };

  saveEmpDataHandler = (formEmpData) => {
    console.log(formEmpData);
    this.setState({
      employee: [...this.state.employee, formEmpData],
    });
  };

  deleteRowHandler = (rowIndex) => {
    const employeeData = [...this.state.employee];
    employeeData.splice(rowIndex, 1);
    this.setState({ employee: employeeData });
  };

  sortHandler = (event) => {
    this.setState({ sortByKey: event.currentTarget.value });
  };

  canDeleteRowHandler = (event) => {
    this.setState({ canDeleteRow: event.target.checked });
  };

  render() {
    return (
      <div>
        <br />
        <EmployeeForm onSaveEmpData={this.saveEmpDataHandler} />

        {this.state.employee.length === 0 && <h4>No Records to Display.</h4>}
        {this.state.employee.length > 0 && (
          <div className="control-group">
            <label className="container">
              {" "}
              Can Delete
              <input
                type="checkbox"
                onChange={(event) => this.canDeleteRowHandler(event)}
              />
              <span className="checkmark"></span>
            </label>
            <div className="form-control">
              <Dropdown
                label="Sort By"
                name="sortKey"
                items={sortByCols}
                change={this.sortHandler}
              />
            </div>
          </div>
        )}
        <DataGrid
          datasource={this.state.employee}
          canDeleteRow={this.state.canDeleteRow}
          deleteRow={this.deleteRowHandler}
          sortByKey={this.state.sortByKey}
          cols={cols}
        />
      </div>
    );
  }
}

export default Employee;
