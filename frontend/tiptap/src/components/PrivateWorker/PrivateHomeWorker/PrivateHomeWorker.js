import React from "react";
import QRCode from "react-qr-code";
import { useUserContext } from "../../../contexts/AuthContext";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import PreviousPageButton from "../../../features/PreviousPageButton";
import { Link } from "react-router-dom";

export default function PrivateHomeWorker() {
  const { userObject, signOutMy } = useUserContext();
  return (
    <Container>
      <Stack>
        <Stack direction="horizontal" className="mb-4">
          <div className="">
            <PreviousPageButton />
          </div>
          <div style={{ marginTop: " 65px", marginLeft: "20px" }}>
            <h1 className="customTitle1">Tip QR Code </h1>
          </div>
        </Stack>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h4 className="">Your tip QR </h4>
          <p className="p-mt-15">
            Share this QR Code with the hotel manager or they can scan it from
            your phone to add you as there employee
          </p>
        </div>
        =
        <div className="d-flex justify-content-center" sm={12}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "50%", width: "50%" }}
            value={`http://localhost:3000/privateManager/private-home-manager/worker-qrcode/userId=${userObject.ID}`}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className="d-flex justify-content-center" sm={12}>
          <h1
            style={{ color: "rgba(251, 188, 4, 1) !important" }}
            className="customName"
          >
            {`${userObject.firstName} ${userObject.lastName}`}{" "}
          </h1>
        </div>
        <div
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
        </div>
        <div className="d-flex justify-content-center" sm={12}>
          <Link
            to="/homepage"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={signOutMy()}
          >
            <p>Logout</p>
          </Link>
        </div>
      </Stack>
    </Container>
  );
}
