import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../../../images/Vector 3.png";
import vector4 from "../../../images/Vector 4.png";
import iconChef from "../../../images/icon_chef.png";
import iconCleaner from "../../../images/icon_cleaner.png";
import iconWaiter from "../../../images/icon_waiter.png";
import "../../../style.css";

import { useEffect, useState } from "react";
import { Button, Container, Modal, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import { useFetchStaff } from "../../../fetches/FetchStaff";

function SelectStaffRole() {
  const fetchStaff = useFetchStaff();
  const { staffObject } = useStaffContext();
  const [role, setRole] = useState(0);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    staffObject.current.role = role;
  }, [role]);

  async function submitStaffObject() {
    console.log("submit", staffObject.current.id_restaurant);
    const jsonData = [
      {
        role: staffObject.current.role,
        stars: 5,
        ID_user: staffObject.current.ID_USER,
        id_restaurant: staffObject.current.id_restaurant,
      },
    ];
    console.log("json", jsonData);
    try {
      const addStaffResponse = await fetchStaff.addStaff(jsonData);
      if (addStaffResponse.status === "Success") {
        setShowPopup(true);
        setTimeout(() => {
          navigate("/privateManager/private-home-manager");
        }, 2000);
      } else {
        console.log("erreur", addStaffResponse.response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Stack>
        <div className="vector-container">
          <PreviousPageButton />
          <img src={vector3} alt="Vector 3" className="vector" />
          <img src={vector4} alt="Vector 4" className="vector" />
        </div>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Staff ajouté avec succès</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            La redirection se fera dans quelques instants...
          </Modal.Body>
        </Modal>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Sélectionner un rôle</h1>
          <p className="p-mt-15">Choisissez la catégorie du personnel</p>
        </div>

        <div className=" d-flex justify-content-center mb-3 mt-3" sm={12}>
          <img
            src={staffObject.current.pictureUrl}
            alt="Upload"
            className=" profile-picture-2"
          />
        </div>
        <div className=" d-flex justify-content-center text-center col-m-50">
          <h5>
            {`${staffObject.current.firstName} ${staffObject.current.lastName}`}
          </h5>
        </div>
        <div className="">
          {/*<h6 style={{ marginLeft: "38px" }}>Select Role</h6>*/}
          <Row
            className=" mx-auto"
            style={{ paddingLeft: "38px", paddingRight: "38px" }}
          >
            <Button
              className="button_role_addStaff col-5"
              style={{
                backgroundColor: "transparent",
                border: "0",
                marginRight: "38px",
              }}
              onClick={() => {
                setRole(1);
              }}
            >
              <Col>
                <div className="">
                  <img
                    src={iconWaiter}
                    style={{ width: "86px", height: "67px" }}
                    alt="logo"
                  />
                </div>
                <div className="">
                  <h3 className="">Serveur</h3>
                </div>
              </Col>
            </Button>
            <Button
              className="button_role_addStaff col-5"
              style={{ backgroundColor: "transparent", border: "0" }}
              onClick={() => {
                setRole(2);
              }}
            >
              <Col>
                <div className="">
                  <img
                    src={iconCleaner}
                    style={{ width: "90px", height: "73px" }}
                    alt="logo"
                  />
                </div>
                <div className="">
                  <h3 className="">Nettoyeur</h3>
                </div>
              </Col>
            </Button>
            <Button
              className="button_role_addStaff col-5 mt-4"
              style={{ backgroundColor: "transparent", border: "0" }}
              onClick={() => {
                setRole(3);
              }}
            >
              <Col>
                <div className="">
                  <img
                    src={iconChef}
                    style={{ width: "101px", height: "73px" }}
                    alt="logo"
                  />
                </div>
                <div className="">
                  <h3 className="">Cuisinier</h3>
                </div>
              </Col>
            </Button>
          </Row>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Button
            onClick={() => submitStaffObject()}
            className="customButton1"
            disabled={role === 0}
          >
            Ajouter personnel
          </Button>
        </div>
      </Stack>
    </Container>
  );
}

export default SelectStaffRole;
