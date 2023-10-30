import Container from "react-bootstrap/Container";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SelectRole from "./SelectRole";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/homepage" Component={HomePage}></Route>
          <Route path="/selectRole" Component={SelectRole}></Route>
          <Route path="/signup" Component={SignUp}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
