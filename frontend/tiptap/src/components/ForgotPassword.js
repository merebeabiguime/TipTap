import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import UserIcon from "../images/signup_user_icon.png";
import "../style.css";

import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
function ForgotPassword() {
  const { forgotPassword } = useUserContext();
  const [validation, setValidation] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const forgot = await forgotPassword(email);
      setValidation("");
      navigate("/");
    } catch (err) {
      setValidation("Incorrect Email Adress");
    }
  };
  return (
    <div>
      <Row>
        <Col className="justify-content-end" sm={12}>
          <div>
            <img
              src={vector3}
              alt="Vector 3"
              className="vector"
              style={{ width: "169.5px", height: "215px" }}
            />
          </div>
          <div>
            <img
              src={vector4}
              alt="Vector 4"
              className="vector"
              style={{ width: "187px", height: "243px" }}
            />
          </div>
        </Col>
        <Col className="d-flex justify-content-center  col-m-200" sm={12}>
          <h1 className="col-m-25">Mot de passe oublié</h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>Veuillez entrer votre adresse email</p>
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
                Réinitialiser le mot de passe
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ForgotPassword;
