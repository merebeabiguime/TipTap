import React, { useEffect } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useUserContext } from "../../../contexts/AuthContext";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import DeleteStaffButton from "../../../features/DeleteStaffButton";
import PreviousPageButton from "../../../features/PreviousPageButton";
import SelectRolePopup from "../../../features/SelectRolePopup";
import Filter from "../../../images/filter_icon.png";
import NoStar from "../../../images/no_star_icon.png";
import Stars from "../../../images/stars.png";

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
        <PreviousPageButton firstTitle="Tout le personnel" />
        {/*<div className="col-12 d-flex justify-content-center align-items-center mb-2">
          <img
            className=" profile-picure"
            src={userObject[0].pictureUrl}
            style={{ position: "absolute", right: "18px" }}
            alt="photo de profil"
          />
  </div>*/}

        <div className="d-flex justify-content-end mt-4">
          <Button
            onClick={() => setIsPopupVisible(!isPopupVisible)}
            style={{ backgroundColor: "transparent", border: "0" }}
          >
            {" "}
            <img src={Filter} alt="Filtre" />
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
                    <Col className="col-12 h-50 allStaff_text">
                      <span>
                        {`${staff.firstName}  ${staff.lastName}  `}
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#757575",
                            fontFamily: "Satoshi Variable",
                          }}
                        >
                          ({`${staff.role}`})
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
                    <DeleteStaffButton staff={staff} />
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
