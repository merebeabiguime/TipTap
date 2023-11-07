import React from "react";
import "../../../style.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../fetches/FetchUsers";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import { useUserContext } from "../../../contexts/AuthContext";
import { isEmailValid } from "../../../fetches/FetchStaff";
import { Col, Row } from "react-bootstrap";

export default function WorkerQrCode() {
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");
  const { staffObject } = useStaffContext();
  const { userObject } = useUserContext();
  let { userId } = useParams();

  async function getWorker() {
    //If the user is connected as a manager
    if (userObject.role == 2) {
      try {
        const getUserReponse = await getUser(userId);

        if (getUserReponse.status == "Success") {
          const getValidStaffResponse = await isEmailValid(
            getUserReponse.response[0].email
          );
          //Check if this email is not already used in staff
          if (getValidStaffResponse.status == "Success") {
            staffObject.current = {
              firstName: getUserReponse.response[0].firstName,
              lastName: getUserReponse.response[0].lastName,
              ID_USER: getUserReponse.response[0].ID,
              pictureUrl: getUserReponse.response[0].pictureUrl,
              stars: 5,
              role: 0,
            };
            //ADD COOLDOWN BEFOFRE GOING TO NEXT PAGE
            navigate(
              "/privateManager/private-home-manager/add-staff/select-staff-role"
            );
          } else {
            setValidation(getValidStaffResponse.response);
            navigate("/privateManager/private-home-manager/");
          }
        } else {
          setValidation(getUserReponse.response);
          navigate("/privateManager/private-home-manager/");
        }
      } catch (err) {
        setValidation("Une erreur est survenue");
        navigate("/privateManager/private-home-manager/");
      }
    } else {
      setValidation("Vous n'êtes pas connecté en tant que manager");
      navigate("/homepage");
    }
  }

  useEffect(() => {
    getWorker();
  }, []);

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
