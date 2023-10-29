import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import logo from "../images/logo.PNG";
import homepageIcon from "../images/homepage_icon.png";
import "../style.css";
import { Button } from "react-bootstrap";

const imageStyle = {
  position: "absolute",
  top: 0, // Ajustez la position verticale au besoin
  right: 0, // Positionner l'image tout à droite de l'écran
};
const customButton1 = {
  backgroundColor: "#FBBC04",
  fontFamily: "Satoshi Black",
  width: "323px",
  height: "65px",
  border: "0px",
};
const customButton2 = {
  backgroundColor: "white",
  color: "black",
  borderColor: "#FBBC04",
  fontFamily: "Satoshi Black",
  width: "323px",
  height: "65px",
};

function HomePage() {
  return (
    <Row>
      <Col className="justify-content-end" sm={12}>
        <div>
          <img src={vector3} alt="Vector 3" style={imageStyle} />
        </div>
        <div>
          <img src={vector4} alt="Vector 4" style={imageStyle} />
        </div>
      </Col>
      <Col
        className=" d-flex justify-content-center"
        sm={12}
        style={{ marginTop: "200px" }}
      >
        <img src={logo} alt="logo" />
      </Col>
      <Col
        className=" d-flex justify-content-center mt-6"
        style={{ marginTop: "50px" }}
      >
        <img src={homepageIcon} alt="logo" />
      </Col>
      <Col
        className="d-flex justify-content-center mt-6"
        sm={12}
        style={{
          marginTop: "50px",
        }}
      >
        <h1 className="text-center">How would you like to register? </h1>
      </Col>
      <Col
        className="d-flex justify-content-center mt-6"
        sm={12}
        style={{
          marginTop: "50px",
        }}
      >
        <p>
          Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nconubia
          nostra, per inceptos himenaeos. Nconubia nostra, per{" "}
        </p>
      </Col>
      <Col
        className="d-flex justify-content-center mt-6"
        sm={12}
        style={{
          marginTop: "50px",
        }}
      >
        <Button style={customButton1}>Log In</Button>
      </Col>
      <Col
        className="d-flex justify-content-center mt-6"
        sm={12}
        style={{
          marginTop: "25px",
          marginBottom: "50px",
        }}
      >
        <Button style={customButton2}>Sign Up</Button>
      </Col>
    </Row>
  );
}

export default HomePage;
