import "../../../style.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserIcon from "../../../images/signup_user_icon.png";
import vector3 from "../../../images/Vector 3.png";
import vector4 from "../../../images/Vector 4.png";

import { Button, InputGroup, Form } from "react-bootstrap";
import { useUserContext } from "../../../contexts/AuthContext";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PreviousPageButton from "../../PreviousPageButton";
import axios from "axios";
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
      const response = await axios.get(
        `http://localhost:8081/staff/email/${inputs.current.value}`
      );
      const role = response.data; // Extrait la valeur du rôle depuis la réponse
      console.log(inputs.current.value);
      console.log(role);
      if (role.status == "Error") {
        staffObject.current = {
          firstName: role[0].firstName,
          lastName: role[0].lastName,
          ID_USER: role[0].ID,
          pictureUrl: role[0].pictureUrl,
          stars: 5,
          role: 0,
        };
        navigate(
          "/privateManager/private-home-manager/add-staff/select-staff-role"
        );
      } else {
        setValidation(role);
      }
    } catch (err) {
      console.log(err);
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
