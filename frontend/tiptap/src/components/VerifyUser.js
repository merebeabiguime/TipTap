import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "../style.css";

import { useEffect, useRef, useState } from "react";
import { Container, Form, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import { useFetchUsers } from "../fetches/FetchUsers";
import { auth } from "../firebase";

function VerifyUser() {
  const { navigateTo, userObject, signOutMy, signOutFirebase } =
    useUserContext();
  const inputs = useRef([]);
  const navigate = useNavigate();
  const fetchUser = useFetchUsers();
  const [timer, setTimer] = useState(30); // Use a number instead of string for the timer
  const [validation, setValidation] = useState("");
  const otpCodeExpired = useRef(false);
  const recaptchaVar = useRef(null);

  useEffect(() => {
    if (timer === 0) {
      otpCodeExpired.current = true;
      setValidation(
        "Votre code a expiré. Veuillez revalider le captcha pour en générer un nouveau."
      );
    }
    if (timer <= 0) {
      setTimer(0);
    }
  }, [timer]);

  const resetTimer = () => {
    otpCodeExpired.current = false;
    setTimer(30);
    setValidation("");
  };

  const verifyUserMutation = useMutation({
    mutationFn: async () => await fetchUser.verify(userObject.UID),
    onSuccess: (data) => {
      console.log("verifyMutationCorrect", data);
      if (data.status === "Success") {
        signOutFirebase();
        navigate("/homepage");
        console.log("success");
      } else {
        console.log("unsucessfull", data);
      }
    },
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [realOtp, setRealOtp] = useState(null);

  const phoneNumber = userObject.phone;

  const sendOtp = async (recaptcha) => {
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptcha
    );
    if (confirmation) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    setRealOtp(confirmation);
  };

  const generateRecaptcha = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(
        "recaptcha",
        {},

        auth
      );

      recaptchaVar.current = recaptcha;
      sendOtp(recaptcha);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateRecaptcha();
  }, []);

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
        if (otpCodeExpired.current === false) {
          try {
            const data = await validateOtp(enteredOtp);
            console.log("data", data);
            verifyUserMutation.mutate();
            //Si ca arrive ici alors on est connecté
          } catch (error) {
            //Si ça arrive ici alors le code n'est pas bon
            setValidation("Code invalide.");
          }
        } else {
          setValidation(
            "Ce code n'est plus valide. Veuillez revalider le captcha."
          );
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

  const validateOtp = async (enteredOtp) => {
    const result = await realOtp.confirm(enteredOtp);
    return result;
  };

  return (
    <Container className="gx-0 fluid ">
      <Stack>
        <div>
          <PreviousPageButton />
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Verify Account</h1>
          <p className="p-mt-15">
            Enter the OTP that you received in your email or phone
          </p>
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33 text-center">Enter OTP</h1>
          <p className="mx-auto text-center">
            We sent your 4 digit code to{" "}
            {`${phoneNumber}.
             This code will epxire in`}{" "}
            <span style={{ color: "red" }}>{`00:${timer}`}</span>
          </p>
        </div>
        <div className="input-field mx-auto border">
          <Stack direction="horizontal">
            {otp.map((digit, index) => (
              <Form.Control
                key={index}
                className="otp-input"
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
          <p className="text-danger">{validation}</p>
        </div>
        <div id="recaptcha" className="mx-auto m-4"></div>
      </Stack>
    </Container>
  );
}

export default VerifyUser;
