import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import logo from "../images/logo.PNG";
import homepageIcon from "../images/homepage_icon.png";
import "../style.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Row>
      <Col className="justify-content-end" sm={12}>
        <div>
          <img src={vector3} alt="Vector 3" className="vector" />
        </div>
        <div>
          <img src={vector4} alt="Vector 4" className="vector" />
        </div>
      </Col>
      <Col className=" d-flex justify-content-center" sm={12}>
        <img className="col-m-200" src={logo} alt="logo" />
      </Col>
      <Col className=" d-flex justify-content-center col-m-50">
        <img src={homepageIcon} alt="logo" />
      </Col>
      <Col className="d-flex justify-content-center col-m-50" sm={12}>
        <h1 className="text-center">How would you like to register? </h1>
      </Col>
      <Col className="d-flex justify-content-center col-m-50" sm={12}>
        <p>
          Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nconubia
          nostra, per inceptos himenaeos. Nconubia nostra, per{" "}
        </p>
      </Col>
      <Link
        to="/selectRole"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Col className="d-flex justify-content-center col-button " sm={12}>
          <Button className="customButton1">Log In</Button>
        </Col>
      </Link>
      <Link
        to="/selectRole"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Col
          className="d-flex justify-content-center col-m-25 col-button "
          sm={12}
        >
          <Button className="customButton2">Sign Up</Button>
        </Col>
      </Link>
    </Row>
  );
}

export default HomePage;
