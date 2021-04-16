import React, { useState } from "react";

import Dropdown from "./Dropdown";

const DeptNameList = [
  {
    name: "HR",
    value: "HR",
  },
  {
    name: "Development",
    value: "Development",
  },
  {
    name: "Accounts",
    value: "Accounts",
  },
  {
    name: "IT services",
    value: "IT services",
  },
];

const DesignationsList = [
  {
    name: "Manager",
    value: "Manager",
  },
  {
    name: "Lead",
    value: "Lead",
  },
];

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val !== null && (valid = false));
  return valid;
  // return (Object.values(errors).every(err=> err === null) && );
};

const EmployeeForm = (props) => {
  // const [isFormValid, setFormIsValid] = useState(false);
  let isFormValid = false;
  const [isFormTouched, setFormIsTouched] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [salary, setSalary] = useState("");
  const [deptName, setDeptName] = useState("");
  const [designation, setDesignation] = useState("");
  const state = {
    employeeNo: null,
    employeeName: null,
    salary: null,
    deptName: null,
    designation: null,
    errors: {
      employeeNo: null,
      employeeName: null,
      salary: null,
      deptName: null,
      designation: null,
    },
  };
  const [errors, setErrors] = useState(state.errors);

  const handleChange = (event) => {
    let errorMsg = "";
    let myregex = /^[0-9]+$/;
    let regexOnlyChars = /^[a-zA-Z ]+$/;
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "employeeNo":
        // let myregex = /^([a-zA-Z0-9@.\-'])*$/;
        // let myregex = /^[0-9]\S*$/;
        setEmployeeNo(value);
        if (value.length === 0) {
          errorMsg = "Please enter employee number";
        } else if (!myregex.test(value)) {
          errorMsg = "Employee number must be positive number";
        }
        break;
      case "employeeName":
        setEmployeeName(value);
        if (value.length === 0) {
          errorMsg = "Please enter employee name";
        } else if (!regexOnlyChars.test(value)) {
          errorMsg = "Employee name must be String";
        }
        break;
      case "salary":
        setSalary(value);
        if (value.length === 0) {
          errorMsg = "Please enter salary";
        } else if (!myregex.test(value)) {
          errorMsg = "Salary must be positive number";
        }
        break;
      case "deptName":
        setDeptName(value);
        errorMsg = value === "" ? "Please select department name" : "";
        break;
      case "designation":
        setDesignation(value);
        errorMsg = value === "" ? "Please select designation" : "";
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: errorMsg });
    setFormIsTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      // console.info('Valid Form')
      const empFormData = {
        employeeNo: employeeNo,
        employeeName: employeeName,
        salary: salary,
        deptName: deptName,
        designation: designation,
      };
      props.onSaveEmpData(empFormData);

      setEmployeeNo("");
      setEmployeeName("");
      setSalary("");
      setDeptName("");
      setDesignation("");
      isFormValid = false;
    } else {
      // console.error('Invalid Form')
    }
  };

  isFormValid =
    Object.values(errors).every((err) => err === "") &&
    isFormTouched &&
    employeeNo &&
    employeeName &&
    salary &&
    deptName &&
    designation;

  // isFormValid = (employeeNo);
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="EmployeNo">Employee No</label>
          <input
            type="text"
            id="employeeNo"
            name="employeeNo"
            onChange={handleChange}
            value={employeeNo}
          />
          {errors.employeeNo !== "" && (
            <p className="error-text">{errors.employeeNo}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="employeeName">Employee Name</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            onChange={handleChange}
            value={employeeName}
          />
          {errors.employeeName !== "" && (
            <p className="error-text">{errors.employeeName}</p>
          )}
        </div>
      </div>

      <div className="control-group">
        <div className="form-control">
          <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            onChange={handleChange}
            value={salary}
          />
          {errors.salary !== "" && (
            <p className="error-text">{errors.salary}</p>
          )}
        </div>

        <Dropdown
          label="Dept Name"
          name="deptName"
          items={DeptNameList}
          change={handleChange}
          error={errors.deptName}
          value={deptName}
        />
      </div>
      <div className="control-group">
        <Dropdown
          label="Designation"
          name="designation"
          items={DesignationsList}
          change={handleChange}
          error={errors.designation}
          value={designation}
        />
      </div>
      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default EmployeeForm;
