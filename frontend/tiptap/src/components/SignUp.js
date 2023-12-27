import MailIcon from "../images/signup_mail_icon.png";
import PasswordIcon from "../images/signup_password_icon.png";
import PhoneIcon from "../images/signup_phone_icon.png";
import UserIcon from "../images/signup_user_icon.png";
import "../style.css";

import { useEffect, useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import UploadingImage from "../features/UploadingImage";
import { useFetchAuth } from "../fetches/FetchAuth";

function SignUp() {
  const { userRole, signUp, data, percentage } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const fetchAuth = useFetchAuth();
  const jsonData = useRef([]);
  const formRef = useRef();

  const signUpWithMysqlMutation = useMutation({
    mutationFn: async () => await fetchAuth.register(jsonData),
    onSuccess: (data) => {
      if (data.status === "Success") {
        window.location.href = "/signIn";
        setValidation("");
      } else {
        setValidation(data.response);
        console.log(data.response);
      }
    },
    onError: (data) => {
      console.log("erreur", data);
    },
  });

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  async function tryToSignUp() {
    //Signing up in Firebase
    try {
      const credentials = await signUp(
        inputs.current[2].value,
        inputs.current[4].value
      );
      console.log("this user", credentials.user);
      //setCurrentUser(credentials.user);
      //Creating temporary variable to store input data
      jsonData.current.push({
        firstName: inputs.current[0].value,
        lastName: inputs.current[1].value,
        email: inputs.current[2].value,
        phone: inputs.current[3].value,
        password: "password",
        role: userRole,
        pictureUrl: data.img
          ? data.img
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
        ID_restaurant: 0,
        UID: credentials.user.uid,
        verified: 0,
      });

      //Enabling userQuery
      signUpWithMysqlMutation.mutate();
    } catch (err) {
      if (err.code === "auth/invalid/email") {
        setValidation("Format de l'email invalide.");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Adresse email déjà utilisée");
      }
    }
  }

  const isValidPhoneNumber = (phoneNumber) => {
    // Expression régulière pour valider le numéro de téléphone
    const phoneNumberRegex = /^\+330\d{9}$/;

    // Vérifier si le numéro de téléphone correspond à l'expression régulière
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[4].value.length || inputs.current[5].value.length) < 6
    ) {
      setValidation(
        "Votre mot de passe doit contenir 6 caractères au minimum."
      );
      return;
    } else if (inputs.current[4].value !== inputs.current[5].value) {
      setValidation("Veuillez entrer des mots de passe qui correspondent.");
      return;
    } else if (!isValidPhoneNumber(inputs.current[3].value)) {
      setValidation("Veuillez entrer un numéro de téléphone valide.");
      return;
    } else if (!isValidPhoneNumber(inputs.current[3].value)) {
      setValidation("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    tryToSignUp();
  };
  useEffect(() => {
    // This effect will be called when the userRole changes
    if (userRole === 0) {
      navigate("/selectRole");
    }
  }, [userRole]);
  return (
    <Container>
      <Stack>
        <PreviousPageButton />
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Créer un compte</h1>
          <p className="p-mt-15">
            Rejoignez la communauté en quelques clics seulement. Entrez les
            informations suivante
          </p>
        </div>
        <UploadingImage />
        <div className=" d-flex justify-content-center mt-4">
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Prénom"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Nom"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={MailIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="email"
                placeholder="Email"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PhoneIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Téléphone : +330769575354"
                className="customForm"
              />
            </InputGroup>
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
                placeholder="Confirmer le mot de passe"
                className="customForm"
              />
            </InputGroup>
            <p className="text-danger mt-1">{validation}</p>
            <Button
              disabled={percentage !== null && percentage < 100}
              type="submit"
              className="customButton1"
            >
              {!signUpWithMysqlMutation.isLoading ? (
                `S'inscrire`
              ) : (
                <Spinner animation="border" />
              )}
            </Button>
          </Form>
        </div>
      </Stack>
    </Container>
  );
}

export default SignUp;
