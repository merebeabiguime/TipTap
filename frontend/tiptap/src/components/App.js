import Container from "react-bootstrap/Container";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SelectRole from "./SelectRole";
import Private from "./Private/Private";
import PrivateHome from "./Private/PrivateHome/PrivateHome";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

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
          <Route path="/private" element={<Private />}>
            <Route path="/private/private-home" element={<PrivateHome />} />
          </Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
