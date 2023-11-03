import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllStaff } from "../../../fetches/FetchStaff";
import { getUser } from "../../../fetches/FetchUsers";
import DeleteButton from "../../../images/delete_staff_button.png";
import EditButton from "../../../images/edit_staff_button.png";
import Filter from "../../../images/filter_icon.png";
import NoStar from "../../../images/no_star_icon.png";
import Stars from "../../../images/stars.png";
import Test from "../../../images/testeee.png";
import SelectRolePopup from "./SelectRolePopup";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";

export default function AllStaff() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const { staffListFilter, setStaffList, setStaffListFilter } =
    useStaffContext();

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      <Row>
        <Col className="col-12 d-flex justify-content-center align-items-center first-margin  ">
          <h2 className=" ">All Staff</h2>
          <img
            className="  "
            src={Test}
            style={{ position: "absolute", right: 0 }}
          />
        </Col>

        <Col className="d-flex justify-content-end margin-18" sm={12}>
          <Button
            onClick={togglePopup}
            style={{ backgroundColor: "transparent", border: "0" }}
          >
            {" "}
            <img src={Filter} />
          </Button>
        </Col>
        <Col className="">
          {staffListFilter.map((staff, index) => (
            <Row key={index} className="d-flex justify-content-center mx-auto">
              <Col className="col-3 d-flex justify-content-center align-items-center">
                <img
                  src={staff.pictureUrl}
                  alt="logo"
                  className="circular-image-3"
                />
              </Col>
              <Col className="customButton6 align-items-center">
                <Row>
                  <Col className="col-10">
                    <Col className="col-12 h-50">
                      <span
                        style={{
                          fontSize: "16px",
                          fontFamily: "Satoshi Black",
                        }}
                      >
                        {staff.firstName} {staff.lastName}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#757575",
                            fontFamily: "Satoshi Variable",
                          }}
                        >
                          ({staff.role})
                        </span>
                      </span>
                    </Col>
                    <Col className="col-12">
                      {(() => {
                        const starImages = [];
                        for (
                          let starIndex = 0;
                          starIndex < staff.stars;
                          starIndex++
                        ) {
                          starImages.push(
                            <img
                              key={starIndex}
                              src={Stars}
                              alt="star"
                              className=""
                            />
                          );
                        }
                        for (
                          let starIndex1 = 0;
                          starIndex1 < 5 - staff.stars;
                          starIndex1++
                        ) {
                          starImages.push(
                            <img
                              key={starIndex1}
                              src={NoStar}
                              alt="Nostar"
                              className=""
                            />
                          );
                        }
                        return starImages;
                      })()}
                    </Col>
                  </Col>
                  <Col className="col-2">
                    <img src={DeleteButton} alt="logo" className="" />
                    <img src={EditButton} alt="logo" className="" />
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
        <SelectRolePopup />
      </Row>
    </div>
  );
}
