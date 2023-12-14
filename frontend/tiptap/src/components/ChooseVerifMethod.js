import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import "../style.css";

import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";

function ChooseVerifMethod() {
  const { verifyEmail, getUserInfos } = useUserContext();
  const navigate = useNavigate();

  const [sendingEmail, setSendingEmail] = useState(false);
  const [sendingEmailMessage, setSendingEmailMessage] = useState("Email");

  const handleEmailVerification = async () => {
    setSendingEmail(true);
    try {
      const result = await verifyEmail();
      setSendingEmailMessage("Email envoyé!");
      setSendingEmail(false);
    } catch (error) {
      setSendingEmailMessage("Erreur...");
      setSendingEmail(false);
    }
  };
  const handleSmsVerification = () => {
    navigate("/validate-phone");
  };

  return !getUserInfos.isLoading && getUserInfos.isSuccess ? (
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
        <Col
          className="d-flex justify-content-center  col-m-200 mx-auto text-center"
          sm={12}
        >
          <h1 className="col-m-25">Choix de la méthode de vérificaiton </h1>
          <p className="p-mt-15">
            Veuillez choisir la méthode de validation qui vous convient le
            mieux.
          </p>
        </Col>
        <div className="d-flex justify-content-center col-button button-mt-40">
          <Button
            style={{ marginLeft: "35px", marginRight: "35px" }}
            className="customButton1"
            onClick={handleSmsVerification}
          >
            SMS
          </Button>
        </div>
        <div className="d-flex justify-content-center col-button button-mt-40">
          <Button
            style={{
              marginLeft: "35px",
              marginRight: "35px",
            }}
            className={`${
              sendingEmailMessage === "Erreur..."
                ? "customButton1-error"
                : sendingEmailMessage === "Email envoyé!"
                ? "customButton1-success"
                : "customButton1"
            }`}
            onClick={handleEmailVerification}
          >
            {/* Condition pour afficher "Email" lorsque sendingEmail est faux et sendingEmailMessage est vide */}
            {sendingEmail === false && sendingEmailMessage === "" && "Email"}

            {/* Condition pour afficher le Spinner lorsque sendingEmail est vrai */}
            {sendingEmail === true && <Spinner animation="border" />}

            {/* Condition pour afficher le message d'erreur ou de succès */}
            {sendingEmailMessage !== "" && `${sendingEmailMessage}`}
          </Button>
        </div>
      </Row>
    </div>
  ) : (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  );
}

export default ChooseVerifMethod;
