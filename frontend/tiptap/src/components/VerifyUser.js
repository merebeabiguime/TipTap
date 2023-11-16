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
          verifyUserMutation.mutate();
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
