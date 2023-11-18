import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import PasswordIcon from "../images/signup_password_icon.png";

import { Button, InputGroup, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useUserContext();
  const [validation, setValidation] = useState("");

  const formRef = useRef();
  const inputs = useRef([]);

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const query = useQuery();
  const handleForm = async (e) => {
    e.preventDefault();

    if (inputs.current[0].value != inputs.current[1].value) {
      setValidation("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await resetPassword(query.get("oobCode"), inputs.current[0].value);
      setValidation("");
      navigate("/homepage");
    } catch (err) {
      console.dir(err);
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
          <h1 className="col-m-25">Réinitialiser son mot de passe </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>Veuillez entrer un nouveau mot de passe</p>
        </Col>
        <Col className=" d-flex justify-content-center" sm={12}>
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="password"
                placeholder="Mot de passe"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="password"
                placeholder="Confirmer le Mot de passe"
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

export default ResetPassword;
