import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "../style.css";

import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Spinner, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import { useFetchUsers } from "../fetches/FetchUsers";

function VerifyUser() {
  const { userObject, otpPhoneNumber, auth, getUserInfos } = useUserContext();
  const inputs = useRef([]);
  const fetchUser = useFetchUsers();
  const [animationActive, setAnimationActive] = useState(false);
  const [otpTime, setOtpTime] = useState(31);
  const [message, setMessage] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [realOtp, setRealOtp] = useState(null);

  const phoneNumber = otpPhoneNumber;

  useEffect(() => {
    if (otpTime <= 30 && otpTime > 0) {
      const intervalId = setInterval(() => {
        setOtpTime(otpTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [otpTime]);

  const sendOtp = async () => {
    const recaptchaVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      setOtpTime(30);
      setRealOtp(confirmation);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          setMessage(
            "Vous avez effectuer un trop grand nombre de tentative qui ont échoués. Veuillez réessayer plus tard."
          );
          break;
        case "auth/invalid-phone-number":
          setMessage("Le numéro de téléphone est invalide");
          break;
        default:
          setMessage("Une erreur s'est produite");
          break;
      }
      console.log(error);
    }
  };

  useEffect(() => {
    initializeRecaptchaVerifier();
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const resetOtpFields = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  const handleButton = () => {
    resetOtpFields();
    sendOtp();
  };
  const initializeRecaptchaVerifier = async () => {
    if (phoneNumber == null) {
      setMessage("something wrong try to again send otp");
      return;
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha",
        { size: "invisible" },
        auth
      );
    } catch (error) {
      setMessage("Une erreur s'est produite");
    }
  };

  const verifyUserMutation = useMutation({
    mutationFn: async () => await fetchUser.verify(userObject[0].UID),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.status === "Success") {
        window.location.href = "/signin";
      } else {
        //Message d'erreur
      }
    },
  });

  const handleInputChange = async (index, value) => {
    // Validate input to allow only numeric values
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Check if all inputs are filled
      if (newOtp.every((digit) => digit !== "")) {
        const enteredOtp = newOtp.join("");
        // Call your validation function here
        if (otpTime > 0) {
          try {
            //OTP VERIFIED
            const validateOtp = await realOtp.confirm(enteredOtp);
            if (validateOtp) {
              setAnimationActive(true);
              verifyUserMutation.mutate();
            } else {
              setMessage("Code invalide.");
              return;
            }
          } catch (error) {
            //Si ça arrive ici alors le code n'est pas bon
            setMessage("Code invalide.");
            return;
          }
        } else {
          setMessage("Ce code n'est plus valide. Veuillez réessayer.");
          setOtpTime(31);
          return;
        }
      } else if (value !== "") {
        // Move focus to the next input if a digit is entered
        const nextIndex = index + 1;
        if (nextIndex < otp.length && inputs.current[nextIndex]) {
          inputs.current[nextIndex].focus();
        }
      }
    }
  };

  return !getUserInfos.isLoading && getUserInfos.isSuccess ? (
    <Container className="gx-0 fluid ">
      <Stack>
        <div>
          <PreviousPageButton />
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Vérifier le compte</h1>
          <p className="p-mt-15">
            Cliquez sur le bouton "Envoyer le code" puis entrez le mot de passe
            à usage unique que vous avez reçu dans votre téléphone.
          </p>
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33 text-center">Entrez l'OTP</h1>
          <p className="mx-auto text-center">
            Nous avons envoyé votre code à 4 chiffres au{" "}
            {`+${phoneNumber.slice(-3)} ***. Ce code expirera dans`}{" "}
            <span style={{ color: "red" }}>{`00:${otpTime}`}</span>
          </p>
        </div>
        <div className="input-field mx-auto">
          <Stack direction="horizontal">
            {otp.map((digit, index) => (
              <Form.Control
                key={index}
                className={`otp-input ${
                  animationActive ? "otp-input-success" : ""
                }`}
                type="number"
                placeholder="*"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                ref={(input) => (inputs.current[index] = input)}
              />
            ))}
          </Stack>
        </div>
        <div className="mx-auto text-center m-4">
          <p className="text-danger">{message}</p>
        </div>
        <div className="d-flex justify-content-center col-button button-mt-40">
          <Button
            style={{ marginLeft: "35px", marginRight: "35px" }}
            className="customButton1"
            onClick={handleButton}
          >
            Envoyer le code
          </Button>
        </div>
        <div id="recaptcha" className="mx-auto m-4"></div>
      </Stack>
    </Container>
  ) : (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  );
}

export default VerifyUser;
