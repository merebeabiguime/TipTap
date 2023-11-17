import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../../../images/Vector 3.png";
import vector4 from "../../../images/Vector 4.png";
import UserIcon from "../../../images/signup_user_icon.png";
import MailIcon from "../../../images/signup_mail_icon.png";
import qrCodeScanner from "../../../images/scan_qrcode_icon.png";
import "../../../style.css";
import { useZxing } from "react-zxing";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/AuthContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import { isEmailValid, useFetchStaff } from "../../../fetches/FetchStaff";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
function AddStaff() {
  const { staffObject } = useStaffContext();
  const inputs = useRef("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const fetchStaff = useFetchStaff();
  const [showVideo, setShowVideo] = useState(false);
  const handleQRCodeScannerClick = () => {
    setShowVideo(true);
  };
  const { ref } = useZxing({
    onDecodeResult(result) {
      window.location.href = result;
    },
    paused: !showVideo,
  });

  const addInput = (el) => {
    inputs.current = el;
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      //Is the email attached to this accoung one of a worker ?
      const getValidStaffResponse = await fetchStaff.isEmailValid(
        inputs.current.value
      );
      if (getValidStaffResponse.status == "Success") {
        staffObject.current = {
          firstName: getValidStaffResponse.response[0].firstName,
          lastName: getValidStaffResponse.response[0].lastName,
          ID_USER: getValidStaffResponse.response[0].ID,
          pictureUrl: getValidStaffResponse.response[0].pictureUrl,
          stars: 5,
          role: 0,
        };
        navigate(
          "/privateManager/private-home-manager/add-staff/select-staff-role"
        );
      } else {
        setValidation(getValidStaffResponse.response);
      }
    } catch (err) {
      setValidation("Une erreur est survenue");
    }
  };
  return (
    <Container>
      <Stack>
        <div className="vector-container">
          <PreviousPageButton />
          <img src={vector3} alt="Vector 3" className="vector" />
          <img src={vector4} alt="Vector 4" className="vector" />
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Add Staff </h1>
          <p className="p-mt-15">
            Enter the staff that are working in the hotel like chef,cleaner,
            waiter
          </p>
        </div>
        <div className=" d-flex justify-content-center form-mt-89">
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={MailIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Staff Email"
                className="customForm"
              />
            </InputGroup>

            <p className="text-danger mt-1">{validation}</p>

            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button type="submit" className="customButton1">
                Add Staff
              </Button>
            </Col>
          </Form>
        </div>
        <div className="mx-auto mt-4 mb-4">
          <h1>--OR--</h1>
        </div>
        <div
          className="mx-auto qrCodeScanner"
          onClick={handleQRCodeScannerClick}
        >
          <img src={qrCodeScanner} />
        </div>
        {showVideo && (
          <div>
            <video
              ref={ref}
              style={{ width: "100%", height: "100%", padding: "50px" }}
            />
          </div>
        )}
      </Stack>
    </Container>
  );
}

export default AddStaff;
