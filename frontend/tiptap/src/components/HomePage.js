import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import homepageIcon from "../images/homepage_icon.png";
import logo from "../images/logo.PNG";
import "../style.css";
import QRCode from "react-qr-code";

function HomePage() {
  return (
    <Row>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      ></div>
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
      <Link to="/signIn" style={{ textDecoration: "none", color: "inherit" }}>
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
