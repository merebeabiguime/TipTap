import vectorGroup from "../images/vector_group.png";
import "../style.css";

import { applyActionCode } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Container, Spinner, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordForm } from "../constants/FormFields";
import { useUserContext } from "../contexts/AuthContext";
import { useFetchUsers } from "../fetches/FetchUsers";
import { auth } from "../firebase";
import useHookForm from "../forms/hook/HookForm";
import CustomPopup from "./popup/CustomPopup";
import ReLoginPopup from "./popup/ReLoginPopup";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Verification() {
  const { currentUser, resetPasswordURL, setResetPasswordURL, userObject } =
    useUserContext();
  const navigate = useNavigate();

  const {
    getValue,
    showInputs,
    setInputList,
    setFormIsSuccess,
    setLoading,
    setDisabled,
    getFormIsSucces,
    getFormChanged,
    setCustomError,
  } = useHookForm({
    inputs: resetPasswordForm(),
    btnText: "Réinitialiser",
  });

  const { resetPassword } = useUserContext();
  const [validation, setValidation] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const [verificationMessage, setVerificationMessage] = useState("");

  const query = useQuery();
  const mode = query.get("mode");
  const oobCode = query.get("oobCode");

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log("user");
    switch (mode) {
      case "resetPassword": {
        setTitle("Réinitialiser le mot de passe ");
        setDescription("Veuillez entrer un nouveau mot de passe");
        setPageLoading(false);
        break;
      }
      case "verifyEmail": {
        handleVerifyEmail();
        setTitle("Vérification de votre adresse email");
        break;
      }
      case "verifyAndChangeEmail": {
        handleVerifyAndChangeEmail();
        setTitle("Vérification de votre adresse email");
        break;
      }
    }
  }, []);

  const [waitingForMutation, setWaitingForMutation] = useState(false);

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
        setDescription(
          "Une erreur s'est produite. Veuillez renvoyer un email de confirmation."
        );
      }
      setPageLoading(false);
    },
  });

  useEffect(() => {
    if (userObject && waitingForMutation) {
      switch (mode) {
        case "verifyEmail": {
          verifyEmailMutation.mutate();
          break;
        }
        case "verifyAndChangeEmail": {
          modifyUserEmailMutation.mutate();
          break;
        }
      }
    }
  }, [userObject]);

  const handleVerifyEmail = async () => {
    try {
      const result = await applyActionCode(auth, oobCode);
      setShowPopup(true);
      setWaitingForMutation(true);
    } catch (error) {
      console.log(error.message);
      if ((error.code = "auth/invalid-action-code")) {
        setDescription(
          "Votre code a expiré. Veuillez renvoyer un nouvel email de confirmation."
        );
      } else {
        setDescription("Une erreur s'est produite");
      }
    }
  };

  const modifyUserEmailMutation = useMutation({
    mutationFn: async () =>
      await fetchUser.updateEmail([
        { email: currentUser.email, uid: currentUser.uid },
      ]),
    onSuccess: (data) => {
      if (data.status === "Success") {
        setDescription("Votre adresse email a été vérifié avec succès.");
      } else {
        setDescription(
          "Votre code a expiré. Veuillez renvoyer un nouvel email de confirmation."
        );
      }
      setPageLoading(false);
    },
    refetchOnWindowFocus: false,
  });

  const handleVerifyAndChangeEmail = async () => {
    try {
      const result = await applyActionCode(auth, oobCode);
      setShowPopup(true);
      setWaitingForMutation(true);

      console.log("result", result);
    } catch (error) {
      console.error(error);
      console.log("erreur");
      if ((error.code = "auth/invalid-action-code")) {
        setDescription(
          "Votre code a expiré. Veuillez renvoyer un nouvel email de confirmation."
        );
      } else {
        setDescription("Une erreur s'est produite");
      }
    }
  };

  const handlePasswordReset = async () => {
    try {
      const password = getValue("resetPassword_password1");
      await resetPassword(oobCode, password);
      setValidation("");

      handleGoToHomePage();
    } catch (err) {
      console.error(err);
    }
  };

  const isFormSuccessfull = getFormIsSucces();
  useEffect(() => {
    if (isFormSuccessfull) {
      handlePasswordReset();
      setFormIsSuccess(false);
    }
  }, [isFormSuccessfull]);

  const handleGoToHomePage = () => {
    window.location.href = "/signIn";
  };
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  return (mode === "verifyEmail" && verifyEmailMutation.isLoading) ||
    (mode === "verifyAndChangeEmail" && verifyEmailMutation.isLoading) ||
    pageLoading ? (
    <div className="centered-div">
      {showPopup && (
        <ReLoginPopup title="Pour valider la vérification, veuillez tenter de vous connecter avec votre nouvelle adresse email." />
      )}
      <Spinner animation="border" />
    </div>
  ) : (
    <Container>
      <Stack style={{ marginRight: "25px", marginLeft: "25px" }}>
        <div className="justify-content-end">
          <img src={vectorGroup} alt="Vector" className="vector " />
        </div>
        <div style={{ marginTop: "250px" }}>
          <h1 className="">{title}</h1>
        </div>
        <div className="mt-4 mb-4">
          <p>{description}</p>
        </div>
        {mode === "resetPassword" && showInputs()}
        {mode === "verifyEmail" ||
          (mode === "verifyAndChangeEmail" && (
            <Button className="customButton1 mt-4" onClick={handleGoToHomePage}>
              Retour à la page d'accueil
            </Button>
          ))}
      </Stack>
    </Container>
  );
}
