import React from "react";
import "../../../style.css";

import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function WorkerQrCode() {
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");
  let { userId } = useParams();

  const qrCodeQuery = qrCodeQuery({
    queryKey: ["qrCode"],
    queryFn: async () => await fetchQRCode.getUser(userId),
    onSuccess: (data) => {
      if (data.status == "Success") {
        //ADD COOLDOWN BEFOFRE GOING TO NEXT PAGE
        navigate(
          "/privateManager/private-home-manager/add-staff/select-staff-role"
        );
      } else {
        setValidation(data.response);
        navigate("/privateManager/private-home-manager/");
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
