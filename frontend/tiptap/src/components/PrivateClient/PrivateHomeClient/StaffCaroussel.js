import React, { useState } from "react";
import IconCleaner from "../../../images/icon_cleaner.png";
import IconWaiter from "../../../images/icon_waiter.png";
import IconChef from "../../../images/icon_chef.png";
import { Button, Carousel } from "react-bootstrap";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";

export default function StaffCaroussel() {
  const [isImagesVisible, setImagesVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const { staffListFilter, setStaffListFilter, staffList, setSelectedStaff } =
    useStaffContext();

  const handleRoleFilterChange = (newRoleFilter) => {
    if (newRoleFilter === "") {
      setStaffListFilter(staffList);
      setImagesVisible(false);
    } else {
      setStaffListFilter(
        staffList.filter((staff) => staff.role === newRoleFilter)
      );
      setImagesVisible(false);
    }
  };
  const selectStaff = (id) => {
    setSelectedStaff(id);
  };

  return (
    <div>
      {isImagesVisible ? (
        <div className="mx-auto mb-4">
          <img
            style={{ width: "31%", height: "11%" }}
            src={IconChef}
            className="image_selectRole"
            alt="icon"
            onClick={() => {
              handleRoleFilterChange("Chef");
            }}
          />
          <img
            style={{ width: "31%", height: "11%" }}
            src={IconCleaner}
            className="image_selectRole"
            alt="icon"
            onClick={() => {
              handleRoleFilterChange("Cleaner");
            }}
          />
          <img
            style={{ width: "31%", height: "11%" }}
            src={IconWaiter}
            className="image_selectRole"
            alt="icon"
            onClick={() => {
              handleRoleFilterChange("Waiter");
            }}
          />
        </div>
      ) : (
        <div className="mx-auto mb-4 carrousel-container">
          <div className="carrousel">
            {staffListFilter.map((staffMember, index) => (
              <Button
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
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
                  <h1 className="customTitle2">
                    {staffMember.firstName} {staffMember.lastName}
                  </h1>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
