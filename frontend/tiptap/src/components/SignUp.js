import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UploadImage from "../images/upload_image_signup.png";
import UserIcon from "../images/signup_user_icon.png";
import PhoneIcon from "../images/signup_phone_icon.png";
import MailIcon from "../images/signup_mail_icon.png";
import PasswordIcon from "../images/signup_password_icon.png";
import axios from "axios";

import { Button, InputGroup, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const { userRole, signUp, currentUser } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

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
      try {
        //Creating temporary variable to store input data
        const jsonData = [
          {
            firstName: inputs.current[0].value,
            lastName: inputs.current[1].value,
            email: inputs.current[2].value,
            phone: inputs.current[3].value,
            password: "password",
            role: userRole,
            pictureUrl: "pictureURL",
            ID_restaurant: 0,
            UID: credentials.user.uid,
          },
        ];
        console.log("JSON:" + jsonData[0].UID);
        await axios.post("http://localhost:8081/user/addUser", jsonData);
        console.log("credentials11 : " + credentials.user.uid);
        setValidation("");
        navigate("/private/private-home");
        formRef.current.reset();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      if (err.code === "auth/invalid/email") {
        setValidation("Email format invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
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
