import Container from "react-bootstrap/Container";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import HomePage from "./HomePage";
import Login from "./Login";
import AddStaff from "./PrivateManager/PrivateHomeManager/AddStaff";
import AllStaff from "./PrivateManager/PrivateHomeManager/AllStaff";
import PrivateHomeManager from "./PrivateManager/PrivateHomeManager/PrivateHomeManager";
import SelectStaffRole from "./PrivateManager/PrivateHomeManager/SelectStaffRole";
import PrivateManager from "./PrivateManager/PrivateManager";
import PrivateHomeWorker from "./PrivateWorker/PrivateHomeWorker/PrivateHomeWorker";
import PrivateWorker from "./PrivateWorker/PrivateWorker";
import ResetPassword from "./ResetPassword";
import SelectRole from "./SelectRole";
import SignUp from "./SignUp";
import { StaffContextProvider } from "../contexts/fetches-contexts/StaffContext";

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
            <StaffContextProvider>
              <Route
                path="/privateManager/private-home-manager/all-staff"
                element={<AllStaff />}
              />
            </StaffContextProvider>
            <Route
              path="/privateManager/private-home-manager/add-staff"
              element={<AddStaff />}
            />
            <Route
              path="/privateManager/private-home-manager/add-staff/select-staff-role"
              element={<SelectStaffRole />}
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
