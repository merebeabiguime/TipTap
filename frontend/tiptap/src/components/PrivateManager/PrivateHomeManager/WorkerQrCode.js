import React, { useEffect, useRef } from "react";
import "../../../style.css";

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchQRCode } from "../../../fetches/FetchQRCode";
import { useQuery } from "react-query";
import { useUserContext } from "../../../contexts/AuthContext";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";

export default function WorkerQrCode() {
  const { qrCodeCall, qrCodeMutation, message, navigateTo, staffAuthObject } =
    useUserContext();
  const { staffObject } = useStaffContext();
  const fetchQRCode = useFetchQRCode();
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");
  let { userId } = useParams();
  const userIdValue = userId.split("=")[1];
  console.log(userIdValue);
  const enableQuery = useRef(true);

  useEffect(() => {
    qrCodeCall(userIdValue);
  }, []);

  useEffect(() => {
    console.log(staffAuthObject.current);
    if (navigateTo !== "") {
      staffObject.current = {
        firstName: staffAuthObject.current.firstName,
        lastName: staffAuthObject.current.lastName,
        ID_USER: staffAuthObject.current.ID,
        pictureUrl: staffAuthObject.current.pictureUrl,
        stars: 5,
        role: 0,
      };
      setTimeout(() => {
        navigate(navigateTo);
      }, 2000);
    }
  }, [navigateTo]);

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
