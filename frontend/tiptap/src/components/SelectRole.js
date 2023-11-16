import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import logo from "../images/logo.PNG";
import icon from "../images/select_role_icon.png";
import "../style.css";

import customerIcon from "../images/customer_icon.png";
import managerIcon from "../images/manager_icon.png";

import { Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";

function SelectRole() {
  const { selectRole } = useUserContext();
  return (
    <>
      <Container className="gx-0 fluid ">
        <Stack>
          <div className="vector-container">
            <img src={vector3} alt="Vector 3" className="vector" />
            <img src={vector4} alt="Vector 4" className="vector" />
          </div>
          <div className=" mx-auto">
            <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="mx-auto">
            <img src={icon} className="image_selectRole" alt="icon" />
          </div>
          <div
            className="text-center"
            style={{ marginRight: "65px", marginLeft: "65px" }}
          >
            <h1 className="h1-mt-15">How would you like to register? </h1>
          </div>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "30px",
              marginRight: "30px",
            }}
            onClick={() => selectRole(1)}
            className="button-mt-40"
          >
            <Row className="border border-gray customButton4 align-items-center">
              <Col className="col-6  mx-auto text-center">
                <img src={customerIcon} alt="logo" />
              </Col>
              <Col className="  col-6 mx-auto align-items-center">
                <h1 className="">Customer</h1>
                <p className="customButton4-p">
                  Show your appreciation for good service by leaving a small
                  amount
                </p>
              </Col>
            </Row>
          </Link>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: "30px",
              marginRight: "30px",
            }}
            onClick={() => selectRole(1)}
          >
            <Row className="border border-gray customButton4 align-items-center">
              <Col className="col-6  mx-auto text-center">
                <img src={managerIcon} alt="logo" />
              </Col>
              <Col className="  col-6 mx-auto align-items-center">
                <h1 className="">Manager</h1>
                <p className="customButton4-p">
                  Managing the hotel overall operation adding staff, check staff
                  performance
                </p>
              </Col>
            </Row>
          </Link>
        </Stack>
      </Container>
    </>
  );
}

export default SelectRole;
