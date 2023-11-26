import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
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
import SelectRolePopup from "../../../features/SelectRolePopup";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import { useUserContext } from "../../../contexts/AuthContext";
import PreviousPageButton from "../../../features/PreviousPageButton";

export default function AllStaff() {
  const { staffListFilter, isPopupVisible, setIsPopupVisible } =
    useStaffContext();
  const { userObject } = useUserContext();
  const { getAllStaff } = useStaffContext();

  useEffect(() => {
    getAllStaff();
  }, []);

  return (
    <Container>
      <Stack>
        <PreviousPageButton />
        <div className="col-12 d-flex justify-content-center align-items-center first-margin  ">
          <h2 className=" ">All Staff</h2>
          <img
            className=" profile-picure"
            src={userObject[0].pictureUrl}
            style={{ position: "absolute", right: "15px" }}
          />
        </div>

        <div className="d-flex justify-content-end mt-2">
          <Button
            onClick={() => setIsPopupVisible(!isPopupVisible)}
            style={{ backgroundColor: "transparent", border: "0" }}
          >
            {" "}
            <img src={Filter} />
          </Button>
        </div>
        <div className="">
          {staffListFilter.map((staff, index) => (
            <Row key={index} className="d-flex justify-content-center mx-auto ">
              <Col className="col-3  d-flex align-items-center">
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
                          fontFamily: "Satoshi Variable",
                          fontWeight: "500",
                          lineHeight: "21.6px",
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
        </div>
        <SelectRolePopup />
      </Stack>
    </Container>
  );
}
