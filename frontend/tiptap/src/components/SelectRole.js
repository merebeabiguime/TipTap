import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import logo from "../images/logo.PNG";
import homepageIcon from "../images/homepage_icon.png";
import customerIcon from "../images/customer_icon.png";
import managerIcon from "../images/manager_icon.png";

import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";

function SelectRole() {
  const { selectRole } = useUserContext();
  return (
    <div>
      <Row>
        <Col className="justify-content-end" sm={12}>
          <div>
            <img src={vector3} alt="Vector 3" className="vector" />
          </div>
          <div>
            <img src={vector4} alt="Vector 4" className="vector" />
          </div>
        </Col>
        <Col className=" d-flex justify-content-center " sm={12}>
          <img className="col-m-200" src={logo} alt="logo" />
        </Col>
        <Col className=" d-flex justify-content-center  col-m-50">
          <img src={homepageIcon} alt="logo" />
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <h1 className="text-center">How would you like to register? </h1>
        </Col>
        <Link
          to="/signup"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => selectRole(1)}
        >
          <Col
            className="d-flex justify-content-center  border border-gray mx-auto align-items-center  customButton4  col-button"
            sm={12}
          >
            <div className="mr-4">
              <img src={customerIcon} alt="logo" />
            </div>
            <div className="text-left">
              <h1>Customer</h1>
              <p>
                Show your appreciation for good service by leaving a small
                amount
              </p>
            </div>
          </Col>
        </Link>
        <Link
          to="/signup"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => selectRole(2)}
        >
          <Col
            className="d-flex justify-content-center  border border-gray mx-auto align-items-center customButton4 col-button"
            sm={12}
          >
            <div className="mr-4">
              <img src={managerIcon} alt="logo" />
            </div>
            <div className="text-left">
              <h1>Manager</h1>
              <p>
                Managing the hotel overall operation adding staff, check staff
                performance
              </p>
            </div>
          </Col>
        </Link>
      </Row>
    </div>
  );
}

export default SelectRole;
