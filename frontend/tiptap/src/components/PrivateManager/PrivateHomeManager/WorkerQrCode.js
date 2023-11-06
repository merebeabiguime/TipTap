import React from "react";
import "../../../style.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../fetches/FetchUsers";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import { useUserContext } from "../../../contexts/AuthContext";
import { isEmailValid } from "../../../fetches/FetchStaff";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function WorkerQrCode() {
  const navigate = useNavigate();
  const query = useQuery();
  const [validation, setValidation] = useState("");
  const { staffObject } = useStaffContext();
  const { userObjectRole } = useUserContext();
  const location = useLocation();
  const userId = location.pathname.split(
    "/privateManager/private-home-manager/worker-qrcode/"
  )[1];

  async function getWorker() {
    //If the user is connected as a manager
    //if (userObjectRole.role != 2) {
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
          navigate(
            "/privateManager/private-home-manager/add-staff/select-staff-role"
          );
        } else {
          setValidation(getValidStaffResponse.response);
        }
      } else {
        setValidation(getUserReponse.response);
      }
    } catch (err) {
      setValidation("Une erreur est survenue");
    }
    //} else {
    //setValidation("Vous n'êtes pas connecté en tant que manager");
    //}
  }

  useEffect(() => {
    getWorker();
  }, []);

  return (
    <div>
      <p className="text-danger mt-1">{validation}</p>
    </div>
  );
}
