import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import apple from "../images/signin_with_apple.png";
import facebook from "../images/signin_with_facebook.png";
import google from "../images/signin_with_google.png";
import PasswordIcon from "../images/signup_password_icon.png";
import UserIcon from "../images/signup_user_icon.png";
import "../style.css";
import { useQuery } from "react-query";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import { getUserFromUID } from "../fetches/FetchUsers";
import { useFetchAuth } from "../fetches/FetchAuth";
import { auth } from "../firebase";

function VerifyUser() {
  const fetchAuth = useFetchAuth();
  const {
    signIn,
    setAccessToken,
    googleQuery,
    signInWith,
    loginMutation,
    loginMutationId,
    navigateTo,
    setNavigateCallback,
    userObject,
  } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const [credentials, setCredentials] = useState(null);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [realOtp, setRealOtp] = useState(null);

  const phoneNumber = "+330761585659";

  const generateRecaptcha = async () => {
    try {
      const recaptcha = new RecaptchaVerifier("recaptcha", {}, auth);
      const confirmation = await signInWithPhoneNumber(
        auth,
        "+330761585659",
        recaptcha
      );
      console.log("conf", confirmation);
      setRealOtp(confirmation);
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
        try {
          const data = await validateOtp(enteredOtp);
          console.log("data", data);
          //Si ca arrive ici alors on est connecté
        } catch (error) {
          //Si ça arrive ici alors le code n'est pas bon
          console.log("code invalide");
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

  useEffect(() => {
    // Code to run on component mount or when 'otp' state changes
    console.log("OTP state changed:", otp);
  }, [otp]);

  useEffect(() => {
    console.log("ca a bougé");
    navigate(navigateTo);
  }, [navigateTo]);

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
            We sent your 4 digit code to {`${userObject.phone}`}
            This code will epxire in <span style={{ color: "red" }}>00:30</span>
          </p>
        </div>
        <div className="input-field mx-auto">
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
        <div id="recaptcha"></div>
      </Stack>
    </Container>
  );
}

export default VerifyUser;
