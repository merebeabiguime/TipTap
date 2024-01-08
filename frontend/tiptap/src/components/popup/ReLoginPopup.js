import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useHookForm from "../../forms/hook/HookForm";
import { useUserContext } from "../../contexts/AuthContext";
import { signInForm } from "../../constants/FormFields";

export default function ReLoginPopup(props) {
  const [showPopup, setShowPopup] = useState(true);
  const { title } = props;
  const {
    getValue,
    showInputs,
    setInputList,
    setLoading,
    setDisabled,
    getFormIsSucces,
  } = useHookForm({
    inputs: signInForm(),
    btnText: "Connexion",
  });

  const {
    signIn,

    signInWith,
    setCurrentUser,
    navigateTo,
    setUserReauthenticated,
  } = useUserContext();
  const [validation, setValidation] = useState("");

  const formIsSuccess = getFormIsSucces();

  useEffect(() => {
    if (formIsSuccess) {
      tryToSignUp();
    }
  }, [formIsSuccess]);

  const tryToSignUp = async () => {
    const email = getValue("signIn_email");
    const password = getValue("signIn_password");

    try {
      //Try to sign in in firebase
      const cred = await signIn(email, password);
      setCurrentUser(cred.user);
      console.log("dans la page login cred user", cred.user);
      setShowPopup(false);
      setUserReauthenticated(true);
    } catch (err) {
      setValidation("Email ou mot de passe incorrect.");
      console.error(err);
    }
  };
  return (
    <div>
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showInputs()}
          <p className="error_message text-center mt-4">{validation}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
