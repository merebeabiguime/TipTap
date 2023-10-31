import Container from "react-bootstrap/Container";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SelectRole from "./SelectRole";
import PrivateManager from "./PrivateManager/PrivateManager";
import PrivateHomeManager from "./PrivateManager/PrivateHomeManager/PrivateHomeManager";
import PrivateWorker from "./PrivateWorker/PrivateWorker";
import PrivateHomeWorker from "./PrivateWorker/PrivateHomeWorker/PrivateHomeWorker";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/homepage" Component={HomePage}></Route>
          <Route path="/selectRole" Component={SelectRole}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/signIn" Component={Login}></Route>
          <Route path="/forgotpassword" Component={ForgotPassword}></Route>
          <Route path="/resetpassword" Component={ResetPassword}></Route>
          <Route path="/privateManager" element={<PrivateManager />}>
            <Route
              path="/privateManager/private-home-manager"
              element={<PrivateHomeManager />}
            />
          </Route>
          <Route path="/privateWorker" element={<PrivateWorker />}>
            <Route
              path="/privateWorker/private-home-worker"
              element={<PrivateHomeWorker />}
            />
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
