import React from "react";
import { Button } from "react-bootstrap";
import { useStaffContext } from "../contexts/fetches-contexts/StaffContext";

export default function SelectRolePopup() {
  const { setStaffListFilter, staffList, isPopupVisible, setIsPopupVisible } =
    useStaffContext();

  const handleRoleFilterChange = (newRoleFilter) => {
    if (newRoleFilter === "") {
      setStaffListFilter(staffList);
    } else {
      setStaffListFilter(
        staffList.filter((staff) => staff.role === newRoleFilter)
      );
    }
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <div>
      <div className={`popup ${isPopupVisible ? "show" : ""}`}>
        <h1 className="justify-content-center d-flex col-m-25">Select Role</h1>
        <Button
          onClick={() => {
            handleRoleFilterChange("Serveur");
          }}
          type="submit"
          className="popup-button-gray"
        >
          Serveurs
        </Button>
        <Button
          onClick={() => {
            handleRoleFilterChange("Nettoyeur");
          }}
          type="submit"
          className="popup-button-gray"
        >
          Nettoyeurs
        </Button>
        <Button
          onClick={() => {
            handleRoleFilterChange("Cuisinier");
          }}
          type="submit"
          className="popup-button-gray"
        >
          Cuisiniers
        </Button>
        <Button
          onClick={() => {
            handleRoleFilterChange("");
          }}
          type="submit"
          className="popup-button-gray"
        >
          Tout
        </Button>
      </div>
      <div
        className={`overlay ${isPopupVisible ? "show" : ""}`}
        onClick={() => setIsPopupVisible(!isPopupVisible)}
      ></div>
    </div>
  );
}
