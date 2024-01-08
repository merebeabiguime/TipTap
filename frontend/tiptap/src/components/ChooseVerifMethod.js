import vectorGroup from "../images/vector_group.png";
import "../style.css";

import { useState } from "react";
import { Button, Container, Spinner, Stack } from "react-bootstrap";
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
    <Container>
      <Stack style={{ marginLeft: "25px", marginRight: "25px" }}>
        <div className="justify-content-end" style={{ marginBottom: "150px" }}>
          <img src={vectorGroup} alt="Vector" className="vector " />
        </div>
        <div>
          <h1 className="col-m-25">Choix de la méthode de vérificaiton </h1>
        </div>
        <div>
          <p>
            Veuillez choisir la méthode de validation qui vous convient le
            mieux.
          </p>
        </div>

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
      </Stack>
    </Container>
  ) : (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  );
}

export default ChooseVerifMethod;
