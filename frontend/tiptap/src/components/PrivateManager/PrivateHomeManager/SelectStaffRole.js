import "../../../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../../../images/Vector 3.png";
import vector4 from "../../../images/Vector 4.png";
import iconWaiter from "../../../images/icon_waiter.png";
import iconChef from "../../../images/icon_chef.png";
import iconCleaner from "../../../images/icon_cleaner.png";
import axios from "axios";

import PreviousPageButton from "../../../features/PreviousPageButton";
import { Button, Container, Stack } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchStaff } from "../../../fetches/FetchStaff";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";

function SelectStaffRole() {
  const fetchStaff = useFetchStaff();
  const { staffObject } = useStaffContext();
  const [role, setRole] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    staffObject.current.role = role;
  }, [role]);

  async function submitStaffObject() {
    const jsonData = [
      {
        role: staffObject.current.role,
        stars: staffObject.current.stars,
        ID_users: staffObject.current.ID_USER,
      },
    ];
    try {
      const addStaffResponse = await fetchStaff.addStaff(jsonData);
      if (addStaffResponse.status === "Success") {
        navigate("/privateManager/private-home-manager");
      } else {
        //Message d'erreur
      }
    } catch (err) {
      //Message d'erreur
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
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Select Role </h1>
          <p className="p-mt-15">
            Enter the staff that are working in the hotel like chef,cleaner,
            waiter
          </p>
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
          <h6 style={{ marginLeft: "38px" }}>Select Role</h6>
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
                  <img src={iconWaiter} alt="logo" />
                </div>
                <div className="">
                  <h3 className="">Waiter</h3>
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
                  <img src={iconCleaner} alt="logo" />
                </div>
                <div className="">
                  <h3 className="">Cleaner</h3>
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
                  <img src={iconChef} alt="logo" />
                </div>
                <div className="">
                  <h3 className="">Chef</h3>
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
            Add Staff
          </Button>
        </div>
      </Stack>
    </Container>
  );
}

export default SelectStaffRole;
