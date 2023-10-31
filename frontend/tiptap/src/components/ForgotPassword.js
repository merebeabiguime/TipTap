import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UploadImage from "../images/upload_image_signup.png";
import UserIcon from "../images/signup_user_icon.png";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";

import { Button, InputGroup, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const { forgotPassword } = useUserContext();
  const [validation, setValidation] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      console.log("inputt" + email);
      const forgot = await forgotPassword(email);
      setValidation("");
      navigate("/homepage");
    } catch (err) {
      setValidation("Incorrect Email Adress");
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
          <h1 className="col-m-25">Forgot Password </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>Enter your email adress</p>
        </Col>
        <Col className=" d-flex justify-content-center  col-m-50" sm={12}>
          <img src={UploadImage} alt="logo" />
        </Col>
        <Col className=" d-flex justify-content-center" sm={12}>
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="customForm"
              />
            </InputGroup>

            <p className="text-danger mt-1">{validation}</p>

            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button type="submit" className="customButton1">
                Send Email Verification
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ForgotPassword;
