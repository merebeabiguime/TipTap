import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useUserContext } from "../../../contexts/AuthContext";

export default function SelectRolePopup() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const { setStaffListFilter, staffList } = useUserContext();

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const handleRoleFilterChange = (newRoleFilter) => {
    if (newRoleFilter === "") {
      setStaffListFilter(staffList);
    } else {
      setStaffListFilter(
        staffList.filter((staff) => staff.role === newRoleFilter)
      );
    }
  };
  return (
    <div>
      <div className={`popup ${isPopupVisible ? "show" : ""}`}>
        <h1 className="justify-content-center d-flex col-m-25">Select Role</h1>
        <Button
          onClick={() => {
            handleRoleFilterChange("Waiter");
          }}
          type="submit"
          className="popup-button-gray"
        >
          Waiter's
        </Button>
        <Button
          onClick={() => {
            handleRoleFilterChange("Cleaner");
          }}
          type="submit"
          className="popup-button-gray"
        >
          Cleaner's
        </Button>
        <Button
          onClick={() => {
            handleRoleFilterChange("Chef");
          }}
          type="submit"
          className="popup-button-gray"
        >
          Chef's
        </Button>
        <Button
          onClick={() => {
            handleRoleFilterChange("");
          }}
          type="submit"
          className="popup-button-gray"
        >
          All
        </Button>
      </div>
      <div
        className={`overlay ${isPopupVisible ? "show" : ""}`}
        onClick={togglePopup}
      ></div>
    </div>
  );
}
