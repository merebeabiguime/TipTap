import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import apple from "../images/signin_with_apple.png";
import facebook from "../images/signin_with_facebook.png";
import google from "../images/signin_with_google.png";
import PasswordIcon from "../images/signup_password_icon.png";
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
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import { useFetchAuth } from "../fetches/FetchAuth";

function Login() {
  const {
    signIn,

    signInWith,
    getUserInfos,
    userObject,
    currentUser,
    setCurrentUser,
  } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      //Try to sign in in firebase
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      setCurrentUser(currentUser);
    } catch (err) {
      setValidation("Email or password incorrect");
    }
  };

  useEffect(() => {
    if (currentUser && getUserInfos.isSuccess) {
      if (getUserInfos.data.response[0].role === 1) {
        navigate("/privateWorker/private-home-worker");
      } else if (getUserInfos.data.response[0].role === 2) {
        navigate("/privateManager/private-home-manager");
      }
    }
  }, [getUserInfos, userObject]);

  return (
    <Container className="gx-0 fluid ">
      <Stack>
        <div className="vector-container">
          <PreviousPageButton />
          <img src={vector3} alt="Vector 3" className="vector" />
          <img src={vector4} alt="Vector 4" className="vector" />
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Log In</h1>
          <p className="p-mt-15">
            Sign In with user ID & password provided by the management
          </p>
        </div>

        <div className=" d-flex justify-content-center form-mt-74" sm={12}>
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Email or username"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="password"
                placeholder="Password"
                className="customForm"
              />
            </InputGroup>

            <p className="text-danger mt-1">{validation}</p>
            <div>
              <Link
                to="/forgotpassword"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p className="p-bold d-flex justify-content-end">
                  Forgot password ?
                </p>
              </Link>
            </div>

            <div className="">
              <Button type="submit" className="customButton1">
                Sign In
              </Button>
            </div>
          </Form>
        </div>
        <div className="  ">
          <p className=" line-divider ">Or continue with</p>
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
        <div className="mt-4">
          <p
            style={{ fontWeight: "bold" }}
            className="d-flex justify-content-center"
          >
            Not a member ?
            <Link
              to="/signup"
              style={{ color: "#E09C4A", textDecoration: "none" }}
            >
              Register Now
            </Link>
          </p>
        </div>
      </Stack>
    </Container>
  );
}

export default Login;
