import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

function ChangePass() {
  const param = useParams();
  console.log(param);
  const id = param.id;
  console.log(id);
  const token = param.token;

  //states

  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  //handleChange()
  const handleChange = ({ target: { name, value } }) => {
    if (name === "password") setPassword(value);
    if (name === "password1") setPassword1(value);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo("");
    console.log("password is:  ", password);
    if (password.length <= 5) {
      setErr("ivalid password");
      return false;
    } else if (password !== password1) {
      setErr("password doesnot matching");
      return false;
    }
    console.log("next try");
    try {
      const res = await axios.post(
        `https://reset-password-nodejs.herokuapp.com/resetpassword/${id}/${token}`,
        {
          password: password,
        }
      );
      console.log(res);
      setPassword("");
      setPassword1("");
      setErr("");
      setInfo("Please log in again with the new password", res.data);
    } catch (err) {
      console.log(err);
      setErr("Error in reset");
    }
  };
  return (
    <>
      <div className="bg-primary card-container">
        <Card className="card" border="secondary">
          <Card.Header className="text-center">
            <h4 className="text-dark">Change Password</h4>
          </Card.Header>
          <Card.Body>
            <form>
              <div className="form-group">
                <label htmlFor="email">Set New password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
                <p className="error">{err}</p>
              </div>
              <Button type="submit" onClick={handleSubmit}>
                Change
              </Button>
              <Link to="/login">
                <Button variant="primary">Login</Button>
              </Link>
              <div className="text-center">
                <p>{info}</p>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ChangePass;
