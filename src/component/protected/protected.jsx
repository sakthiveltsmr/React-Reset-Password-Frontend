import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

function Protected() {
  const [log] = useContext(AppContext);

  return (
    <>
      {log ? (
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col">
              <h1>Welcome to Protected Page</h1>
            </div>
          </div>
          <div className="row">
            <Link to="/login">
              <Button variant="info">Login</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center align-items-center ">
            <p>Please Login to view this page</p>
            <br />
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Protected;
