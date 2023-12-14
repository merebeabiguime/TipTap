import React, { useState } from "react";
import IconCleaner from "../../../images/icon_cleaner.png";
import IconWaiter from "../../../images/icon_waiter.png";
import IconChef from "../../../images/icon_chef.png";
import { Button, Carousel } from "react-bootstrap";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";

export default function StaffCaroussel() {
  const [isCarousselVisible, setIsCarousselVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const { staffListFilter, setStaffListFilter, staffList, setSelectedStaff } =
    useStaffContext();

  const handleRoleFilterChange = (newRoleFilter) => {
    if (isCarousselVisible && newRoleFilter === selectedRole) {
      setIsCarousselVisible(false);
      selectStaff(null);
    } else if (newRoleFilter === "Cleaner") {
      setIsCarousselVisible(false);
      selectStaff(-1);
    } else if (newRoleFilter === "Chef") {
      setIsCarousselVisible(false);
      selectStaff(0);
    } else {
      setStaffListFilter(
        staffList.filter((staff) => staff.role === newRoleFilter)
      );
      setIsCarousselVisible(true);
      setSelectedRole(newRoleFilter);
    }
  };
  const selectStaff = (id) => {
    setSelectedStaff(id);
  };

  return (
    <div>
      <div className="mx-auto mb-4 d-flex justify-content-center align-items-center">
        <img
          src={IconChef}
          className={
            selectedRole === "Chef"
              ? `image_selectRoleOther`
              : `image_selectRole`
          }
          alt="icon"
          onClick={() => {
            handleRoleFilterChange("Chef");
            setSelectedRole("Chef");
          }}
        />
        <img
          src={IconCleaner}
          className={
            selectedRole === "Cleaner"
              ? `image_selectRoleOther`
              : `image_selectRole`
          }
          alt="icon"
          onClick={() => {
            handleRoleFilterChange("Cleaner");
            setSelectedRole("Cleaner");
          }}
        />
        <img
          src={IconWaiter}
          className="image_selectRole"
          alt="icon"
          onClick={() => {
            handleRoleFilterChange("Waiter");
            setSelectedRole("Waiter");
          }}
        />
      </div>
      {isCarousselVisible && (
        <div className="mx-auto mb-4 carrousel-container">
          <div className="carrousel">
            {staffListFilter.map((staffMember, index) => (
              <Button
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                style={{ background: "white", border: "none" }}
                onClick={() => selectStaff(staffMember.ID)}
              >
                <div
                  className={`carrousel-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                >
                  <img
                    className="profilePicture_payments"
                    src={staffMember.pictureUrl}
                  ></img>
                  <h1 className="customTitle2">{staffMember.firstName}</h1>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
