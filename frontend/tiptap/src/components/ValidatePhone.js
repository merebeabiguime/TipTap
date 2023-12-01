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
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import { useFetchUsers } from "../fetches/FetchUsers";

function ValidatePhone() {
  const { userObject, setOtpPhoneNumber, getUserInfos } = useUserContext();
  const inputs = useRef([]);
  const navigate = useNavigate();
  const fetchUser = useFetchUsers();
  const [timer, setTimer] = useState(30); // Use a number instead of string for the timer
  const [validation, setValidation] = useState("");
  const otpCodeExpired = useRef(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
    setOtpPhoneNumber(event.target.value);
  };

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

  const goToOtp = () => {
    navigate("/verifyUser");
  };

  return !getUserInfos.isLoading && getUserInfos.isSuccess ? (
    <Container className="gx-0 fluid ">
      <Stack>
        <div>
          <PreviousPageButton />
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Vérifier le numéro</h1>
          <p className="p-mt-15">
            Veuillez vérifier que ce numéro de téléphone est valide(format
            +330*********)
          </p>
        </div>
        <div className=" d-flex justify-content-center form-mt-74" sm={12}>
          <Form>
            <InputGroup className="mb-4">
              <Form.Control
                type="text"
                placeholder={userObject[0].phone}
                value={newPhoneNumber}
                onChange={handlePhoneNumberChange} // Gérer le changement du numéro de téléphone
                className="customForm1"
                style={{ height: "65px" }}
              />
              <Button
                style={{ marginLeft: "35px", marginRight: "35px" }}
                className="customButton1"
                onClick={goToOtp}
              >
                Valider
              </Button>
            </InputGroup>
          </Form>
        </div>
      </Stack>
    </Container>
  ) : (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  );
}

export default ValidatePhone;
