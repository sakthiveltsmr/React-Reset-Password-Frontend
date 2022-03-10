import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import ChangePass from "./component/changepass/changepass";
import ForgotPass from "./component/forgotpass/forgotpass";
import Login from "./component/login/login";
import Protected from "./component/protected/protected";
import Register from "./component/register/register";

export const AppContext = React.createContext();

function App() {
  const [log, setLog] = useState(false);
  return (
    <div className="App">
      <Router>
        <Routes>
          <AppContext.Provider value={[log, setLog]}>
            <Route path="/protected" element={<Protected />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/forgotpassword" element={<ForgotPass />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/resetpassword/:id/:token" element={<ChangePass />} />
            <Route exact path="/">
              <Navigate to="/login" />
            </Route>
          </AppContext.Provider>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
