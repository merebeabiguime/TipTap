import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UploadImage from "../images/upload_image_signup.png";
import UserIcon from "../images/signup_user_icon.png";
import PasswordIcon from "../images/signup_password_icon.png";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import axios from "axios";

import { Button, InputGroup, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const { signIn } = useUserContext();
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

    try {
      const credentials = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      setValidation("");
      navigate("/private/private-home");
    } catch (err) {
      setValidation("Email or password incorrect");
    }
  };
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
        <Col className="d-flex justify-content-center  col-m-200" sm={12}>
          <h1 className="col-m-25">Log In </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>Sign In with user ID & password provided by the management</p>
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
                placeholder="Email or username"
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
            <p className="text-danger mt-1">{validation}</p>
            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button type="submit" className="customButton1">
                Sign In
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
