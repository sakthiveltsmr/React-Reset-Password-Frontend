import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import * as YUP from "yup";
import { NavLink } from "react-router-dom";
import "./register.css";
function register() {
  const [info, setInfo] = useState("");
  const createAccount = async (values) => {
    try {
      console.log("acc created");
      const response = await axios.post(
        "https://reset-password-nodejs.herokuapp.com/users/register",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      console.log(response);
      setInfo(response.data);
      return true;
    } catch (err) {
      console.log(err.response.data);
      setInfo(err.response.data);
      return false;
    }
  };
  const signInSchema = YUP.object().shape({
    name: YUP.string().required("please enter name"),
    email: YUP.string().email().required("please enter your email"),
    password: YUP.string()
      .min(6, "password should be greater than 5 charecter")
      .required("Enter your password"),
  });
  return (
    <>
      <div className="bg-primary card-container">
        <Card className="card" border="secondary">
          <Card.Header className="text-center">
            <h4 className="text-dark">Create Account</h4>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={signInSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                createAccount(values);
                resetForm();
              }}
            >
              {() => {
                return (
                  <Form>
                    <div className="form-group mb-3">
                      <label className="text-start" htmlFor="email">
                        Name
                      </label>
                      <Field
                        className="form-control-link"
                        id="name"
                        type="text"
                        name="name"
                        component="input"
                      />
                      <div className="error">
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-start" htmlFor="email">
                        Email
                      </label>
                      <Field
                        className="form-control-link"
                        id="email"
                        type="email"
                        name="email"
                        component="input"
                      />
                      <div className="error">
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="text-start" htmlFor="email">
                        Password
                      </label>
                      <Field
                        className="form-control-link"
                        id="password"
                        type="password"
                        name="password"
                        component="input"
                      />
                      <div className="error">
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button type="submit" variant="success">
                        Create
                      </Button>
                      <Button className="mx-2" variant="success">
                        <NavLink className="loginLink" to="/login">
                          Login
                        </NavLink>
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className="text-success">
              <h3>{info}</h3>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default register;
