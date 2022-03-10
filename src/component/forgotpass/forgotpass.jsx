import { Button } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

import { Card } from "react-bootstrap";

function ForgotPass() {
  // states
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");

  //handleChange

  const handleChange = ({ target: { value } }) => {
    // console.log(value);
    setEmail(value);
    setInfo("");
  };

  //submit ()
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    if (email.length === 0) setErr("please Enter mail ");
    try {
      const res = await axios.post(
        "https://reset-password-nodejs.herokuapp.com/resetpassword",
        { email: email }
      );
      console.log(res);

      setEmail("");
      setErr("");
      setInfo("Please Check your Email for Activation link");
    } catch (err) {
      console.log("Error is:", err.response.data);
      setErr(err.response.data);
    }
  };

  return (
    <>
      <div className="bg-primary card-container">
        <Card className="card" border="secondary">
          <Card.Header className="text-center">
            <h4 className="text-dark">Forgot Password</h4>
          </Card.Header>
          <Card.Body>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
                <p className="error">{err}</p>
              </div>
              <div>
                <Button type="sumbit" variant="success" onClick={handleSubmit}>
                  Send Email
                </Button>
              </div>
              <p className="text-center">{info}</p>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ForgotPass;
