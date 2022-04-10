import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../../services/employeeService";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" }
];

const initialFValues = {
  id: 0,
  firstName: "",
  middleName: "",
  lastName: "",
  dateofbirth: "",
  addressline1: "",
  city: "",
  pincode: "",
  phonenumber: "",
  email: ""
};

export default function EmployeeForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("middleName" in fieldValues)
      temp.middleName = fieldValues.middleName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    if ("addressline1" in fieldValues)
      temp.addressline1 = fieldValues.addressline1
        ? ""
        : "This field is required.";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "This field is required.";
    if ("pincode" in fieldValues)
      temp.pincode = fieldValues.pincode ? "" : "This field is required.";
    if ("phonenumber" in fieldValues)
      temp.phonenumber =
        fieldValues.phonenumber.length > 9
          ? ""
          : "Minimum 10 numbers required.";

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";

    setErrors({
      ...temp
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      employeeService.insertEmployee(values);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <Controls.Input
            label="Middle Name"
            name="middleName"
            value={values.middleName}
            onChange={handleInputChange}
            error={errors.middleName}
          />
          <Controls.Input
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <Controls.DatePicker
            name="dateofbirth"
            label="Date of Birth"
            value={values.dateofbirth}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Address Line 1"
            name="addressline1"
            value={values.addressline1}
            onChange={handleInputChange}
            error={errors.addressline1}
          />
          <Controls.Input
            label="Address Line 2"
            name="addressline2"
            value={values.addressline2}
            onChange={handleInputChange}
            error={errors.addressline2}
          />
          <Controls.Input
            label="City"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Pincode"
            name="pincode"
            value={values.pincode}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Phone Number"
            name="phonenumber"
            value={values.phonenumber}
            onChange={handleInputChange}
            error={errors.phonenumber}
          />
          <Controls.Input
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Form>
  );
}
