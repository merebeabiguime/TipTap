import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import UserIcon from "../images/signup_user_icon.png";
import vectorGroup from "../images/vector_group.png";
import "../style.css";

import { useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
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
    <Container className="gx-0 fluid ">
      <Stack style={{ marginRight: "25px", marginLeft: "25px" }}>
        <div>
          <PreviousPageButton firstTitle="Mot de passe oublié" />
        </div>
        <div>
          <p>
            Afin de réinitialiser votre mot de passe, veuillez entrer votre
            adresse email. Si cette adresse email existe dans notre base de
            données, nous vous enverrons un email de réinitilisation du mot de
            passe.
          </p>
        </div>
        <div className=" d-flex justify-content-center mt-4">
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
        </div>
      </Stack>
    </Container>
  );
}

export default ForgotPassword;
