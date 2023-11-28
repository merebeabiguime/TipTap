import React, { useEffect, useRef } from "react";
import "../../../style.css";

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../contexts/AuthContext";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import { useFetchQRCode } from "../../../fetches/FetchQRCode";
import { useMutation } from "react-query";

export default function WorkerQrCode() {
  const { navigateTo, staffAuthObject } = useUserContext();
  const { staffObject } = useStaffContext();
  const fetchQRCode = useFetchQRCode();
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");
  const [message, setMessage] = useState("");
  let { userId } = useParams();
  const userIdValue = userId.split("=")[1];
  const enableQuery = useRef(true);

  const qrCodeMutation = useMutation({
    mutationFn: async () => await fetchQRCode.getUser(userIdValue),
    onSuccess: (data) => {
      console.log("success data", userIdValue);
      console.log("data", data);
      console.log("data.data", data.data);
      if (data.status === "Success") {
        //ADD COOLDOWN BEFOFRE GOING TO NEXT PAGE
        setMessage("Vous allez être redirigé vers la page d'ajout du staff...");
        staffObject.current = data.response[0];
        setTimeout(() => {
          navigate(
            "/privateManager/private-home-manager/add-staff/select-staff-role"
          );
        }, 2000);
      } else {
        console.log("pas success", userIdValue);
        //setValidation(data.response);
        setMessage(
          data.response,
          "Vous allez être redirigé vers la page d'accueil..."
        );
        setTimeout(() => {
          navigate("/privateManager/private-home-manager/");
        }, 2000);
      }
    },
  });

  useEffect(() => {
    qrCodeMutation.mutate();
  }, []);

  return (
    <div>
      <Row>
        <Col
          className=" d-flex justify-content-center align-items-center"
          sm={12}
        >
          <h1>{message}</h1>
        </Col>
      </Row>
    </div>
  );
}
