import apple from "../images/signin_with_apple.png";
import facebook from "../images/signin_with_facebook.png";
import google from "../images/signin_with_google.png";
import vectorGroup from "../images/vector_group.png";
import "../style.css";

import { useEffect, useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInForm } from "../constants/FormFields";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import useHookForm from "../forms/hook/HookForm";

export default function Login() {
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
  } = useUserContext();
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  const formIsSuccess = getFormIsSucces();

  useEffect(() => {
    console.log("ces ISSSSSS");
    if (formIsSuccess) {
      console.log("ces ussss");
      tryToSignUp();
    } else {
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
    } catch (err) {
      setValidation("Email or password incorrect");
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("naviga", navigateTo);
    navigate(navigateTo);
  }, [navigateTo]);
  return (
    <Container className="gx-0 fluid ">
      <Stack style={{ marginRight: "25px", marginLeft: "25px" }}>
        <div className="justify-content-end">
          <img src={vectorGroup} alt="Vector" className="vector " />
          <PreviousPageButton
            secondTitle="Connexion"
            subTitle="Connectez-vous avec votre mail et le mot de passe 
"
          />
        </div>

        <div style={{ marginTop: "70px" }}></div>
        {showInputs()}

        <div>
          <Link
            to="/forgotpassword"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p className="d-flex justify-content-end mt-2">
              Mot de passe oublié ?
            </p>
          </Link>
        </div>

        <p className="text-danger mt-1">{validation}</p>

        <div className="  ">
          <p className=" line-divider ">Ou continuez avec</p>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <div>
            <img
              onClick={() => signInWith("facebook")}
              src={facebook}
              alt="facebook"
            />
          </div>
          <div>
            <img
              onClick={() => signInWith("google")}
              src={google}
              alt="google"
            />
          </div>
          <div>
            <img onClick={() => signInWith("apple")} src={apple} alt="apple" />
          </div>
        </div>
        <div className="mt-4" style={{ whiteSpace: "pre" }}>
          <p
            style={{ fontWeight: "bold" }}
            className="d-flex justify-content-center"
          >
            {`Vous n'êtes pas membre?`}
            <Link
              to="/signup"
              style={{ color: "#FBBC04", textDecoration: "none" }}
            >
              {`  Inscrivez-vous`}
            </Link>
          </p>
        </div>
      </Stack>
    </Container>
  );
}
