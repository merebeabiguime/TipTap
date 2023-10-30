import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UploadImage from "../images/upload_image_signup.png";
import UserIcon from "../images/signup_user_icon.png";
import PhoneIcon from "../images/signup_phone_icon.png";
import MailIcon from "../images/signup_mail_icon.png";
import PasswordIcon from "../images/signup_password_icon.png";

import { Button, InputGroup, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { useRef, useState } from "react";

function SignUp() {
  const { userRole, signUp } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");

  console.log("aa :" + signUp);

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[4].value.length || inputs.current[5].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[4].value != inputs.current[5].value) {
      setValidation("Passwords dont match");
      return;
    }

    try {
      const credentials = await signUp(
        inputs.current[2].value,
        inputs.current[4].value
      );
      formRef.current.reset();
      setValidation("");
      console.log(credentials);
    } catch (err) {}
  };
  return (
    <div>
      <Row>
        <Col className="d-flex justify-content-center  " sm={12}>
          <h1 className="col-m-25">Create Account </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>
            Join the community with just a few taps. Enter the following
            information {userRole}
          </p>
        </Col>
        <Col className=" d-flex justify-content-center  col-m-50" sm={12}>
          <img src={UploadImage} alt="logo" />
        </Col>
        <Col className=" d-flex justify-content-center" sm={12}>
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="First name"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Last name"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={MailIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="email"
                placeholder="Email"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PhoneIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Phone number"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="password"
                placeholder="Password"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="password"
                placeholder="Confirm Password"
                className="customForm"
              />
            </InputGroup>
            <p className="text-danger mt-1">{validation}</p>
            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button type="submit" className="customButton1">
                Sign Up
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
