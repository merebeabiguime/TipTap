import Container from "react-bootstrap/Container";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/homepage" Component={HomePage}></Route>
          <Route path="/signup" Component={SignUp}></Route>
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
