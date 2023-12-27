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
import { useUserContext } from "../../../contexts/AuthContext";
function AddStaff() {
  const { staffObject } = useStaffContext();
  const { userObject } = useUserContext();
  const inputs = useRef("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const fetchStaff = useFetchStaff();
  const [showVideo, setShowVideo] = useState(false);

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
      console.log("id res", userObject[0].ID_restaurant);
      if (getValidStaffResponse.status === "Success") {
        staffObject.current = {
          firstName: getValidStaffResponse.response[0].firstName,
          lastName: getValidStaffResponse.response[0].lastName,
          ID_USER: getValidStaffResponse.response[0].ID,
          pictureUrl: getValidStaffResponse.response[0].pictureUrl,
          id_restaurant: userObject[0].ID_restaurant,
          stars: 0,
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
    <Container className="gx-0 fluid ">
      <Stack>
        <div className="vector-container">
          <img
            src={vector3}
            alt="Vector 3"
            className="vector"
            style={{ width: "169.5px", height: "215px" }}
          />
          <img
            src={vector4}
            alt="Vector 4"
            className="vector"
            style={{ width: "187px", height: "243px" }}
          />
        </div>
        <PreviousPageButton />
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Ajouter du personnel</h1>
          <p className="p-mt-15">
            Veuillez entrer l'adresse email des membres du personnel déjà
            inscrit ou alors veuillez scanner leur QR CODE
          </p>
        </div>
        <div className=" d-flex justify-content-center form-mt-89">
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={MailIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Email du personnel"
                className="customForm"
              />
            </InputGroup>

            <p className="text-danger mt-1">{validation}</p>

            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button type="submit" className="customButton1">
                Ajouter personnel
              </Button>
            </Col>
          </Form>
        </div>
        <div className="mx-auto mt-4 mb-4">
          <h1>--OU--</h1>
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
