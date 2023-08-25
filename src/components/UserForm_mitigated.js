import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import "./App.css";
import DOMPurify from "dompurify";

const UserForm_mitigated = (props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("You have enter an invalid email address")
      .required("Required"),
  });

  return (
    <div className="form-wrapper">
      <div className="App"></div>

      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label>username</label> <br />
            <Field name="username" type="text" className="form-control" />
            <ErrorMessage
              name="username"
              className="d-block invalid-feedback"
              component="span"
            />
            <br />
            <br />
          </FormGroup>
          <FormGroup>
            <label>email</label> <br />
            <Field name="email" type="text" className="form-control" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
            <br />
            <br />
          </FormGroup>

          <div className="button_submit">
            <Button size="lg" block="block" type="submit">
              {props.children}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm_mitigated;
