import Col from "react-bootstrap/Col";
import vector3 from "../../../images/Vector 3.png";
import vector4 from "../../../images/Vector 4.png";
import qrCodeScanner from "../../../images/scan_qrcode_icon.png";
import MailIcon from "../../../images/signup_mail_icon.png";
import "../../../style.css";
import vectorGroup from "../../../images/vector_group.png";

import { QrScanner } from "@yudiel/react-qr-scanner";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import { useFetchStaff } from "../../../fetches/FetchStaff";
import { useUserContext } from "../../../contexts/AuthContext";
import { addStaffForm } from "../../../constants/FormFields";
import useHookForm from "../../../forms/hook/HookForm";
function AddStaff() {
  const { staffObject } = useStaffContext();
  const { userObject } = useUserContext();
  const inputs = useRef("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const fetchStaff = useFetchStaff();
  const [showVideo, setShowVideo] = useState(false);

  const {
    getValue,
    showInputs,
    setInputList,
    setLoading,
    setDisabled,
    getFormIsSucces,
  } = useHookForm({ inputs: addStaffForm, btnText: "Ajouter personnel" });

  const handleQRCodeScannerClick = () => {
    setShowVideo(true);
  };

  const handleQRScanner = (result) => {
    window.location.href = result;
    setShowVideo(false);
  };

  const tryAddStaff = async () => {
    setValidation("");

    try {
      const email = getValue("addStaff_email");
      //Is the email attached to this accoung one of a worker ?
      const getValidStaffResponse = await fetchStaff.isEmailValid(email);
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
        setLoading(false);
        setDisabled(false);
        setValidation(getValidStaffResponse.response);
      }
    } catch (err) {
      setLoading(false);
      setDisabled(false);
      setValidation("Une erreur est survenue");
    }
  };

  const formIsSuccess = getFormIsSucces();
  useEffect(() => {
    console.log("deeee", formIsSuccess);
    if (formIsSuccess === true) {
      setLoading(true);
      setDisabled(true);
      tryAddStaff();
    }
  }, [formIsSuccess]);

  return (
    <Container className="gx-0 fluid ">
      <Stack style={{ marginLeft: "25px", marginRight: "25px" }}>
        <div className="justify-content-end">
          <img src={vectorGroup} alt="Vector" className="vector " />
          <PreviousPageButton
            secondTitle="Ajouter du personnel"
            subTitle="Veuillez entrer l'adresse email des membres du personnel déjà
            inscrit ou alors veuillez scanner leur QR CODE 
"
          />
        </div>
        <div style={{ marginTop: "50px" }}>{showInputs()}</div>
        <p className="text-danger mt-3">{validation}</p>
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
