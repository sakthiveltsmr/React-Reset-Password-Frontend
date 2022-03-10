import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import * as YUP from "yup";
import { NavLink } from "react-router-dom";
import "./register.css";

function Register() {
  const [info, setInfo] = useState("");

  const createAccount = async (values) => {
    try {
      console.log("acc created ");
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
      setInfo(err.response.data.Error);
      return false;
    }
  };

  const signInSchema = YUP.object().shape({
    name: YUP.string().required("Please enter name"),
    email: YUP.string().email().required("Please Enter Your Email"),
    password: YUP.string()
      .min(6, "password should be greather than 5 characters")
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
                        className="form-control link"
                        id="name"
                        type="text"
                        name="name"
                        component="input"
                      />
                      <div className="error">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    {/* email */}
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <Field
                        className="form-control link"
                        id="email"
                        type="email"
                        name="email"
                        component="input"
                      />
                      <div className="error">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                    {/* password */}
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
                      <Field
                        className="form-control link"
                        component="input"
                        type="password"
                        id="password"
                        name="password"
                      />
                      <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Button type="submit" variant="success">
                        Create
                      </Button>
                      <Button className="mx-2 " variant="success">
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

export default Register;
