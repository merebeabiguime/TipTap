import "../style.css";

import { useEffect } from "react";
import { Container, Spinner, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validatePhoneForm } from "../constants/FormFields";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import useHookForm from "../forms/hook/HookForm";

function ValidatePhone() {
  const { userObject, setOtpPhoneNumber, getUserInfos, otpPhoneNumber } =
    useUserContext();
  const navigate = useNavigate();

  const {
    getValue,
    showInputs,
    setInputList,
    setLoading,
    setDisabled,
    getFormIsSucces,
  } = useHookForm({
    inputs: validatePhoneForm({ phone: userObject ? userObject[0].phone : "" }),
    btnText: "Continuer",
  });

  useEffect(() => {
    setOtpPhoneNumber(userObject[0].phone);
  }, []);

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

  const formIsSuccess = getFormIsSucces();

  useEffect(() => {
    console.log("deeee", formIsSuccess);
    if (formIsSuccess === true) {
      const phoneNumber = getValue("chooseVerifMethode_phoneNumber");
      if (
        phoneNumber !== undefined &&
        phoneNumber !== null &&
        phoneNumber !== "" &&
        phoneNumber != userObject[0].phone
      ) {
        setOtpPhoneNumber(phoneNumber);
      }
      if (formIsSuccess) {
        navigate("/verifyUser");
        console.log("success");
      }
      console.log("otp", otpPhoneNumber);
    }
  }, [formIsSuccess]);

  return !getUserInfos.isLoading && getUserInfos.isSuccess ? (
    <Container className="gx-0 fluid ">
      <Stack style={{ marginLeft: "25px", marginRight: "25px" }}>
        <div>
          <PreviousPageButton firstTitle="Vérifier le numéro" />
        </div>
        <div>
          <p>
            Vous avez la possibilité de modifier le numéro de téléphone avant
            d'envoyer le code. Si vous ne souhaitez pas le modifier veuillez
            simplement cliquer sur continuer(format +330762575658)
          </p>
        </div>
        {showInputs()}
      </Stack>
    </Container>
  ) : (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  );
}

export default ValidatePhone;
