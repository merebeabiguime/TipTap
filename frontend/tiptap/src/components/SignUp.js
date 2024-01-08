import "../style.css";

import { useEffect, useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { signupForm } from "../constants/FormFields";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import UploadingImage from "../features/UploadingImage";
import { useFetchAuth } from "../fetches/FetchAuth";
import useHookForm from "../forms/hook/HookForm";

function SignUp() {
  const { signUp, data, percentage, navigateTo } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const fetchAuth = useFetchAuth();
  let { role } = useParams();
  const roleParamsValue = role && role.split("=")[1];
  const jsonData = useRef([]);

  useEffect(() => {
    console.log("roleValue", roleParamsValue);
  }, []);
  const {
    getValue,
    showInputs,
    setInputList,
    setLoading,
    setDisabled,
    getFormIsSucces,
  } = useHookForm({ inputs: signupForm, btnText: "S'insrire" });

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

  useEffect(() => {
    percentage !== null && percentage < 100
      ? setDisabled(true)
      : setDisabled(false);
  }, [percentage]);
  useEffect(() => {
    !signUpWithMysqlMutation.isLoading ? setLoading(false) : setLoading(true);
  }, [signUpWithMysqlMutation]);
  useEffect(() => {
    navigate(navigateTo);
  }, [navigateTo]);

  useEffect(() => {
    console.log("params", roleParamsValue);
  }, []);

  async function tryToSignUp() {
    const test = getValue("password1");
    console.log("dans le try", test);
    //Signing up in Firebase
    try {
      const credentials = await signUp(
        getValue("email"),
        getValue("password1")
      );
      jsonData.current.push({
        firstName: getValue("firstName"),
        lastName: getValue("lastName"),
        email: getValue("email"),
        phone: getValue("phoneNumber"),
        password: "password",
        role: roleParamsValue && roleParamsValue === 2 ? 2 : 1,
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
  const formIsSuccess = getFormIsSucces();

  useEffect(() => {
    console.log("deeee", formIsSuccess);
    if (formIsSuccess === true) {
      console.log("dada");
      setLoading(true);
      tryToSignUp();
    }
  }, [formIsSuccess]);

  return (
    <Container>
      <Stack style={{ marginLeft: "25px", marginRight: "25px" }}>
        <PreviousPageButton />
        <div>
          <h1>Créer un compte</h1>
          <p className="p-mt-15">
            Rejoignez la communauté en quelques clics. Entrez les informations
            suivante
          </p>
        </div>
        <UploadingImage />

        {showInputs()}
        <h1>{validation}</h1>
      </Stack>
    </Container>
  );
}

export default SignUp;
