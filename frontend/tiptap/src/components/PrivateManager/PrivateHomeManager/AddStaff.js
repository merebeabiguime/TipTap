import Col from "react-bootstrap/Col";
import vector3 from "../../../images/Vector 3.png";
import vector4 from "../../../images/Vector 4.png";
import qrCodeScanner from "../../../images/scan_qrcode_icon.png";
import MailIcon from "../../../images/signup_mail_icon.png";
import "../../../style.css";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import { useFetchStaff } from "../../../fetches/FetchStaff";
function AddStaff() {
  const { staffObject } = useStaffContext();
  const inputs = useRef("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const fetchStaff = useFetchStaff();
  const [showVideo, setShowVideo] = useState(false);

  /*const scanner = new Html5QrcodeScanner("reader", {
    qrbox: { width: 250, height: 250 },
    fps: 5,
  });

  scanner.render(success, error);

  function success(result) {
    scanner.clear();
    window.location.href = result;
  }

  function error(err) {
    console.log(err);
  }*/

  const handleQRCodeScannerClick = () => {
    setShowVideo(true);
  };

  const handleQRScanner = (result) => {
    window.location.href = result;
    setShowVideo(false);
  };

  const addInput = (el) => {
    inputs.current = el;
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    setValidation("");

    try {
      //Is the email attached to this accoung one of a worker ?
      const getValidStaffResponse = await fetchStaff.isEmailValid(
        inputs.current.value
      );
      if (getValidStaffResponse.status === "Success") {
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
          <img alt="" src={qrCodeScanner} />
        </div>
        {showVideo && (
          <div>
            <QrScanner
              onDecode={(result) => handleQRScanner(result)}
              onError={(error) => console.log(error?.message)}
            />
          </div>
        )}
      </Stack>
    </Container>
  );
}

export default AddStaff;
