import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import ForgotPass from "./component/forgotpass/forgotpass";
import Login from "./component/login/login";
import Register from "./component/register/register";
import Protected from "./component/protected/protected";
import ChangePass from "./component/changepass/changepass";

export const AppContext = React.createContext();
function App() {
  const [log, setlog] = useState(false);
  return (
    <div className="App">
      <Router>
        <Routes>
          <AppContext.Provider value={[log, setlog]}>
            <Route path="/protected" element={<Protected />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPass />} />
            <Route path="/resetpassword/:id/:token" element={<ChangePass />} />
            <Route path="/">
              <Navigate to="/login" />
            </Route>
          </AppContext.Provider>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
