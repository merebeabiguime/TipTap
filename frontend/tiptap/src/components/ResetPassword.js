import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import PasswordIcon from "../images/signup_password_icon.png";
import "../style.css";

import { applyActionCode } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import { useFetchUsers } from "../fetches/FetchUsers";
import { auth } from "../firebase";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const { currentUser, resetPasswordURL, setResetPasswordURL } =
    useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser && resetPasswordURL.current === "") {
      setResetPasswordURL(window.location.href); // Store the current URL
      navigate("/signIn");
    }
  }, []);

  const { resetPassword } = useUserContext();
  const [validation, setValidation] = useState("");

  const [verificationMessage, setVerificationMessage] = useState("");

  const formRef = useRef();
  const inputs = useRef([]);

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const query = useQuery();
  const mode = query.get("mode");
  const oobCode = query.get("oobCode");

  const fetchUser = useFetchUsers();
  const verifyEmailMutation = useMutation({
    mutationFn: async () => await fetchUser.verify(currentUser.uid),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.status === "Success") {
        setVerificationMessage(
          "Votre adresse email a été vérifié avec succès."
        );
      } else {
      }
    },
  });

  const handleVerifyEmail = async () => {
    try {
      const result = await applyActionCode(auth, oobCode);
      setVerificationMessage("Votre adresse email a été vérifié avec succès.");
      return;
    } catch (error) {
      console.log(error.message);
      if ((error.message = "Firebase: Error (auth/invalid-action-code).")) {
        setVerificationMessage(
          "Votre code a expiré. Veuillez renvoyer un nouvel email de confirmation."
        );
      }
    }
    verifyEmailMutation.mutate();
  };
  useEffect(() => {
    if (mode === "verifyEmail" && currentUser) {
      handleVerifyEmail();
    }
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();

    if (inputs.current[0].value !== inputs.current[1].value) {
      setValidation("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await resetPassword(oobCode, inputs.current[0].value);
      setValidation("");
      handleGoToHomePage();
    } catch (err) {
      console.dir(err);
    }
  };

  const handleGoToHomePage = () => {
    window.location.href = "/signIn";
  };
  return mode === "resetpassword" ? (
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
          <h1 className="col-m-25">Réinitialiser le mot de passe </h1>
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
  ) : mode === "verifyEmail" && !verifyEmailMutation.isLoading ? (
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
          <h1 className="col-m-25">Vérification email </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>{verificationMessage}</p>
        </Col>
        <div className="d-flex justify-content-center col-button button-mt-40">
          <Button
            style={{ marginLeft: "35px", marginRight: "35px" }}
            className="customButton1"
            onClick={handleGoToHomePage}
          >
            Retour à la page d'accueil
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

export default ResetPassword;
