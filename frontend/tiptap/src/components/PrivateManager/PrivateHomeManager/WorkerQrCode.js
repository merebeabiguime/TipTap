import React from "react";
import "../../../style.css";

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchQRCode } from "../../../fetches/FetchQRCode";
import { useQuery } from "react-query";

export default function WorkerQrCode() {
  const fetchQRCode = useFetchQRCode();
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");
  let { userId } = useParams();
  const userIdValue = userId.split("=")[1];

  console.log("dedannnnnnnnnnnns");

  const qrCodeQuery = useQuery({
    queryKey: ["qrCode"],
    queryFn: async () => await fetchQRCode.getUser(userIdValue),
    onSuccess: (data) => {
      if (data.status == "Success") {
        //ADD COOLDOWN BEFOFRE GOING TO NEXT PAGE
        setTimeout(() => {
          navigate(
            "/privateManager/private-home-manager/add-staff/select-staff-role"
          );
        }, 2000);
        console.log("AHAHHAHA");
      } else {
        setValidation(data.response);
        setTimeout(() => {
          navigate("/privateManager/private-home-manager/");
        }, 2000);
      }
    },
  });
  return (
    <div>
      <Row>
        <Col
          className=" d-flex justify-content-center align-items-center"
          sm={12}
        >
          <h1>{validation}</h1>
        </Col>
      </Row>
    </div>
  );
}
