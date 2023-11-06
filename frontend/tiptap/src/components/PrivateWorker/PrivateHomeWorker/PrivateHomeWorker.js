import React from "react";
import QRCode from "react-qr-code";
import { useUserContext } from "../../../contexts/AuthContext";
import { Button, Col, Row } from "react-bootstrap";
import PreviousPageButton from "../../../features/PreviousPageButton";

export default function PrivateHomeWorker() {
  const { userObject } = useUserContext();
  return (
    <div>
      <Row>
        <Col className="previous-button col-1">
          <PreviousPageButton />
        </Col>
        <Col className="previous-button  col-11 d-flex justify-content-center">
          <h1 className="customTitle1">Tip QR Code </h1>
        </Col>
        <Col className="" sm={12}>
          <h4 className="col-m-25">Your tip QR </h4>
        </Col>
        <Col className="col-m-50" sm={12}>
          <p>
            Share this QR Code with the hotel manager or they can scan it from
            your phone to add you as there employee
          </p>
        </Col>
        <Col className="d-flex justify-content-center" sm={12}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "50%", width: "50%" }}
            value={`/privateManager/private-home-manager/worker-qrcode/${userObject.ID}`}
            viewBox={`0 0 256 256`}
          />
        </Col>
        <Col className="d-flex justify-content-center" sm={12}>
          <h1
            style={{ color: "rgba(251, 188, 4, 1) !important" }}
            className="customName"
          >
            {`${userObject.firstName} ${userObject.lastName}`}{" "}
          </h1>
        </Col>
        <Col
          className=""
          sm={12}
          style={{ paddingLeft: "37px", paddingRight: "37px" }}
        >
          <Button
            type="submit"
            className="customButton1"
            style={{ marginBottom: "15px" }}
          >
            Save to Gallery
          </Button>
          <Button
            type="submit"
            className="customButton2"
            style={{ marginBottom: "89px" }}
          >
            Share this QR Code
          </Button>
        </Col>
      </Row>
    </div>
  );
}
