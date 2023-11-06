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
import { Button } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addStaff } from "../../../fetches/FetchStaff";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";

function SelectStaffRole() {
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
      const addStaffResponse = await addStaff(jsonData);
      if (addStaffResponse.status === "Success") {
        navigate("/privateManager/private-home-manager");
      } else {
        console.log(addStaffResponse.response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Row>
        <Col className="previous-button" sm={12}>
          <PreviousPageButton />
        </Col>
        <Col className="justify-content-end" sm={12}>
          <div>
            <img src={vector3} alt="Vector 3" className="vector" />
          </div>
          <div>
            <img src={vector4} alt="Vector 4" className="vector" />
          </div>
        </Col>
        <Col className="d-flex justify-content-center  col-m-200" sm={12}>
          <h1 className="col-m-25">Select Role </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>
            Enter the staff that are working in the hotel like chef,cleaner,
            waiter
          </p>
        </Col>

        <Col className=" d-flex justify-content-center mb-3" sm={12}>
          <img
            src={staffObject.current.pictureUrl}
            alt="Upload"
            className=" circular-image-2"
          />
        </Col>
        <Col
          className=" d-flex justify-content-center text-center col-m-50"
          sm={12}
        >
          <h2>
            {`${staffObject.current.firstName} ${staffObject.current.lastName}`}
          </h2>
        </Col>
        <Col className="">
          <h1>Select Role</h1>
          <Row className=" d-flex  text-center">
            <Button
              className="customButton5 col-button  col-auto"
              style={{ backgroundColor: "transparent", border: "0" }}
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
              className="customButton5 col-button  col-auto"
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
              className="customButton5 col-button  col-auto"
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
        </Col>

        <Col className="d-flex justify-content-center  col-m-25" sm={12}>
          <Button
            onClick={() => submitStaffObject()}
            className="customButton1"
            disabled={role === 0}
          >
            Add Staff
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SelectStaffRole;
