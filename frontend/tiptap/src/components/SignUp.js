import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import logo from "../images/logo.PNG";
import homepageIcon from "../images/homepage_icon.png";
import customerIcon from "../images/customer_icon.png";
import managerIcon from "../images/manager_icon.png";
import UploadImage from "../images/upload_image_signup.png";
import UserIcon from "../images/signup_user_icon.png";
import PhoneIcon from "../images/signup_phone_icon.png";
import MailIcon from "../images/signup_mail_icon.png";
import PasswordIcon from "../images/signup_password_icon.png";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";

function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userRole, setUserRole] = useState(0);

  const handleRole = (role) => {
    setUserRole(role);
    setCurrentStep(currentStep + 1);
  };

  let content;
  if (currentStep === 0) {
    content = (
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
          onClick={() => handleRole(1)}
        >
          <Col
            className="d-flex justify-content-center  border border-gray mx-auto align-items-center customButton4"
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
          onClick={() => handleRole(2)}
        >
          <Col
            className="d-flex justify-content-center  border border-gray mx-auto align-items-center customButton4"
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
    );
  } else if (currentStep === 1) {
    content = (
      <Row>
        <Col className="d-flex justify-content-center  " sm={12}>
          <h1 className="col-m-25">Create Account </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>
            Join the community with just a few taps. Enter the following
            information
          </p>
        </Col>
        <Col className=" d-flex justify-content-center  col-m-50" sm={12}>
          <img src={UploadImage} alt="logo" />
        </Col>
        <Col className=" d-flex justify-content-center" sm={12}>
          <Form>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                type="text"
                placeholder="First name"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                type="text"
                placeholder="Last name"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={MailIcon} alt="User" />
              <Form.Control
                type="email"
                placeholder="Email"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PhoneIcon} alt="User" />
              <Form.Control
                type="text"
                placeholder="Phone number"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                type="password"
                placeholder="Password"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className="customForm"
              />
            </InputGroup>
          </Form>
        </Col>
        <Col className="d-flex justify-content-center  col-m-25" sm={12}>
          <Button className="customButton1">Sign Up</Button>
        </Col>
      </Row>
    );
  }
  return <div>{content}</div>;
}

export default SignUp;
