import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import vector3 from "../../../images/Vector 3.png";
import vector4 from "../../../images/Vector 4.png";
import UserIcon from "../../../images/signup_user_icon.png";
import "../../../style.css";

import axios from "axios";
import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/AuthContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import { isEmailValid } from "../../../fetches/FetchStaff";
function AddStaff() {
  const { staffObject } = useUserContext();
  const inputs = useRef("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  const addInput = (el) => {
    inputs.current = el;
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const getValidStaffResponse = isEmailValid(inputs.current.value);
      if (getValidStaffResponse.status == "Success") {
        staffObject.current = {
          firstName: getValidStaffResponse.response[0].firstName,
          lastName: getValidStaffResponse.response[0].lastName,
          ID_USER: getValidStaffResponse.response[0].ID,
          pictureUrl: getValidStaffResponse.response[0].pictureUrl,
          stars: 5,
          role: 0,
        };
        navigate(
          "/privateManager/private-home-manager/add-staff/select-staff-role"
        );
      } else {
        setValidation(getValidStaffResponse.response);
      }
    } catch (err) {
      setValidation("Une erreur est survenue");
    }
  };
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
          <h1 className="col-m-25">Add Staff </h1>
        </Col>
        <Col className="d-flex justify-content-center  col-m-50" sm={12}>
          <p>
            Enter the staff that are working in the hotel like chef,cleaner,
            waiter
          </p>
        </Col>
        <Col className=" d-flex justify-content-center" sm={12}>
          <Form onSubmit={handleForm} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                ref={addInput}
                type="text"
                placeholder="Staff Email"
                className="customForm"
              />
            </InputGroup>

            <p className="text-danger mt-1">{validation}</p>

            <Col className="d-flex justify-content-center  col-m-25" sm={12}>
              <Button type="submit" className="customButton1">
                Add Staff
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddStaff;
