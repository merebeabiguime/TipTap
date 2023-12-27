import Col from "react-bootstrap/Col";
import iconStaff from "../../../images/icon_staff.png";
import qrCodeIcon from "../../../images/qrcode_icon.png";

import icon_cleaner from "../../../images/icon_cleaner.png";
import "../../../style.css";

import { Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/AuthContext";

function PrivateHomeManager() {
  const { selectRole, signOutFirebase } = useUserContext();

  const handleLogout = async () => {
    console.log("dedans");
    try {
      const result = await signOutFirebase();
      window.location.href = "/signIn";
      console.log("success", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="gx-0 fluid ">
      <Stack>
        <Col
          className="d-flex justify-content-center  col-m-200
        "
        >
          <h1 className="text-center">Tous les détails</h1>
        </Col>
        <Link
          to="/privateManager/private-home-manager/all-staff"
          style={{ textDecoration: "none", color: "inherit", margin: "30px" }}
          onClick={() => selectRole(1)}
        >
          <Row className="customButton4 d-flex align-items-center">
            <Col className="col-4">
              <img
                src={iconStaff}
                alt="logo"
                style={{ width: "107px", height: "82px" }}
              />
            </Col>
            <Col>
              <h1 className=" text-center">Le personnel</h1>
            </Col>
          </Row>
        </Link>
        <Link
          to="/privateManager/private-home-manager/add-staff"
          style={{ textDecoration: "none", color: "inherit", margin: "30px" }}
          onClick={() => selectRole(1)}
        >
          <Row className="customButton4 d-flex align-items-center">
            <Col className="col-4">
              <img
                src={icon_cleaner}
                alt="logo"
                style={{ width: "107px", height: "82px" }}
              />
            </Col>
            <Col>
              <h1 className=" text-center">Ajouter</h1>
            </Col>
          </Row>
        </Link>
        <Link
          to="/privateManager/private-home-manager/order-qrcode"
          style={{ textDecoration: "none", color: "inherit", margin: "30px" }}
          onClick={() => selectRole(1)}
        >
          <Row className="customButton4 d-flex align-items-center">
            <Col className="col-4 text-center">
              <img
                src={qrCodeIcon}
                alt="logo"
                style={{ width: "64px", height: "64px" }}
                className="text-center"
              />
            </Col>
            <Col className=" text-center">
              <h1>Commandez votre Qr-Code</h1>
            </Col>
          </Row>
        </Link>
        <div className="d-flex justify-content-center mt-4">
          <p onClick={handleLogout}>Déconnexion</p>
        </div>
      </Stack>
    </Container>
  );
}

export default PrivateHomeManager;
