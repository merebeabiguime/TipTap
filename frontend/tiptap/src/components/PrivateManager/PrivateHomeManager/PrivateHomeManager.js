import Col from "react-bootstrap/Col";
import customerIcon from "../../../images/customer_icon.png";
import managerIcon from "../../../images/manager_icon.png";
import "../../../style.css";

import { Container, Stack } from "react-bootstrap";
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
    <Container>
      <Stack>
        <Col
          className="d-flex justify-content-center  col-m-200
        "
          sm={12}
        >
          <h1 className="text-center">Tous les détails</h1>
        </Col>
        <Link
          to="/privateManager/private-home-manager/all-staff"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => selectRole(1)}
        >
          <Col
            className="d-flex border border-gray mx-auto align-items-center customButton4 col-button"
            sm={12}
          >
            <div className="mr-4 ">
              <img src={customerIcon} alt="logo" />
            </div>
            <div className="flex-grow-1  text-right d-flex justify-content-center align-items-center">
              <h1 className="mb-0">Le personnel</h1>
            </div>
          </Col>
        </Link>
        <Link
          to="/privateManager/private-home-manager/add-staff"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => selectRole(1)}
        >
          <Col
            className="d-flex border border-gray mx-auto align-items-center customButton4 col-button"
            sm={12}
          >
            <div className="mr-4 ">
              <img src={managerIcon} alt="logo" />
            </div>
            <div className="flex-grow-1  text-right d-flex justify-content-center align-items-center">
              <h1 className="mb-0">Ajouter</h1>
            </div>
          </Col>
        </Link>
        <div className="d-flex justify-content-center mt-4">
          <p onClick={handleLogout}>Déconnexion</p>
        </div>
      </Stack>
    </Container>
  );
}

export default PrivateHomeManager;
