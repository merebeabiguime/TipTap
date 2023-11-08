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

import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/AuthContext";
import PreviousPageButton from "../features/PreviousPageButton";
import { getUserFromUID } from "../fetches/FetchUsers";
import { useFetchAuth } from "../fetches/FetchAuth";

function Login() {
  const fetchAuth = useFetchAuth();
  const { signIn, setAccessToken } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const [credentials, setCredentials] = useState(null);
  const navigate = useNavigate();
  const signedIn = useRef(false);

  const userQuery = useQuery({
    queryKey: ["userObject"],
    queryFn: async () => await fetchAuth.login([{ UID: credentials.user.uid }]),
    enabled: signedIn.current,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      console.log("firstAccesToken", data.accessToken);
      if (data.status === "Success") {
        navigate(data.response);
      } else {
        setValidation(data.response);
      }
      signedIn.current = false;
    },
  });

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
      setCredentials(cred);
      signedIn.current = true;
    } catch (err) {
      setValidation("Email or password incorrect");
    }
  };

  return (
    <div>
      <Row>
        <Col className="previous-button" sm={12}>
          <PreviousPageButton />
        </Col>
        <Col className="justify-content-end" sm={12}>
          <div>
            <img src={vector3} alt="Vector 3" className="vector" />
          </div>
          <div>
            <img src={vector4} alt="Vector 4" className="vector" />
          </div>
        </Col>
        <Col className="d-flex justify-content-center  col-m-200" sm={12}>
          <h1 className="col-m-25">Log In </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>Sign In with user ID & password provided by the management</p>
        </Col>
        <Col className=" d-flex justify-content-center" sm={12}>
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
            <Col sm={12}>
              <Link
                to="/forgotpassword"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <p className="d-flex justify-content-end mx-auto">
                  Forgot password ?
                </p>
              </Link>
            </Col>

            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button type="submit" className="customButton1">
                Sign In
              </Button>
            </Col>
          </Form>
        </Col>
        <Col className="d-flex justify-content-center  " sm={12}>
          <p className="d-flex justify-content-center line-divider ">
            Or continue with
          </p>
        </Col>
        <Col className="d-flex justify-content-center col-m-25" sm={12}>
          <div>
            <img src={facebook} alt="facebook" />
          </div>
          <div>
            <img src={google} alt="google" />
          </div>
          <div>
            <img src={apple} alt="apple" />
          </div>
        </Col>
        <Col className="d-flex justify-content-center mx-auto " sm={12}>
          <p
            style={{ fontWeight: "bold" }}
            className="d-flex justify-content-center"
          >
            Not a member ?{" "}
            <Link
              to="/signup"
              style={{ color: "#E09C4A", textDecoration: "none" }}
            >
              {" "}
              Register Now
            </Link>
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
