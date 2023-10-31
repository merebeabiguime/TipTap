import "../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UploadImage from "../images/upload_image_signup.png";
import UserIcon from "../images/signup_user_icon.png";
import PhoneIcon from "../images/signup_phone_icon.png";
import MailIcon from "../images/signup_mail_icon.png";
import PasswordIcon from "../images/signup_password_icon.png";
import axios from "axios";

import { Button, InputGroup, Form } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import PreviousPageButton from "./PreviousPageButton";

function SignUp() {
  const { userRole, signUp, currentUser } = useUserContext();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    console.log("data image" + data.img);
  }, [data]);

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[4].value.length || inputs.current[5].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[4].value != inputs.current[5].value) {
      setValidation("Passwords dont match");
      return;
    }

    try {
      const credentials = await signUp(
        inputs.current[2].value,
        inputs.current[4].value
      );
      try {
        //Creating temporary variable to store input data
        const jsonData = [
          {
            firstName: inputs.current[0].value,
            lastName: inputs.current[1].value,
            email: inputs.current[2].value,
            phone: inputs.current[3].value,
            password: "password",
            role: userRole,
            pictureUrl: data.img ? data.img : "default.png",
            ID_restaurant: 0,
            UID: credentials.user.uid,
          },
        ];
        console.log("JSON:" + jsonData[0].UID);
        await axios.post("http://localhost:8081/user/addUser", jsonData);
        console.log("credentials11 : " + credentials.user.uid);
        setValidation("");
        navigate("/private/private-home");
        formRef.current.reset();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      if (err.code === "auth/invalid/email") {
        setValidation("Email format invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
  };
  return (
    <div>
      <Row>
        <Col className="previous-button" sm={12}>
          <PreviousPageButton />
        </Col>
        <Col className="d-flex justify-content-center  " sm={12}>
          <h1 className="col-m-25">Create Account </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>
            Join the community with just a few taps. Enter the following
            information {userRole}
          </p>
        </Col>

        <Col className=" d-flex justify-content-center  col-m-50" sm={12}>
          <input
            type="file"
            className="form-control"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {data.img ? ( // Vérifiez si une image a été téléchargée
            <img src={data.img} alt="Profile" className="circular-image" />
          ) : (
            <label htmlFor="file" className="btn ">
              <img src={UploadImage} alt="Upload" className="mr-2" />
            </label>
          )}
        </Col>
        <Col className=" d-flex justify-content-center" sm={12}>
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="First name"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Last name"
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
                placeholder="Phone number"
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
            <InputGroup>
              <img className="iconForm" src={PasswordIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="password"
                placeholder="Confirm Password"
                className="customForm"
              />
            </InputGroup>
            <p className="text-danger mt-1">{validation}</p>
            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button
                disabled={percentage !== null && percentage < 100}
                type="submit"
                className="customButton1"
              >
                Sign Up
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
