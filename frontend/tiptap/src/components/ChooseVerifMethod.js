import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import PasswordIcon from "../images/signup_password_icon.png";

import { Button, InputGroup, Form, Spinner } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useFetchUsers } from "../fetches/FetchUsers";
import { applyActionCode } from "firebase/auth";
import { auth } from "../firebase";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ChooseVerifMethod() {
  const {
    currentUser,
    resetPasswordURL,
    setResetPasswordURL,
    verifyEmail,
    setCurrentUser,
    signOutFirebase,
  } = useUserContext();
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

  /*useEffect(() => {
    const handleLogout = async () => {
      console.log("dedans");
      try {
        const result = await signOutFirebase();
        setCurrentUser(null);
        window.location.href = "/signIn";
        console.log("success", result);
      } catch (error) {
        console.error(error);
      }
    };

    // ComponentWillUnmount logic (cleanup)
    return () => {
      handleLogout(); // Call the logout function when the component is unmounted
    };
  }, []);*/

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
          <h1 className="col-m-25">Choix de la méthode de vérificaiton </h1>
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
  );
}

export default ChooseVerifMethod;
