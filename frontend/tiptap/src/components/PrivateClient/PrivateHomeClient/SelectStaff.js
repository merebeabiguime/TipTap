import React, { useEffect } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useUserContext } from "../../../contexts/AuthContext";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import DeleteButton from "../../../images/delete_staff_button.png";
import EditButton from "../../../images/edit_staff_button.png";
import Filter from "../../../images/filter_icon.png";
import NoStar from "../../../images/no_star_icon.png";
import Stars from "../../../images/stars.png";
import SelectRolePopup from "../../../features/SelectRolePopup";
import { Link, useNavigate } from "react-router-dom";

export default function SelectStaff() {
  const {
    staffListFilter,
    isPopupVisible,
    setIsPopupVisible,
    setSelectedStaffTip,
    selectedStaffTip,
    setStaffListFilter,
    staffList,
  } = useStaffContext();
  const { userObject } = useUserContext();
  const { getAllStaff, selectedStaff } = useStaffContext();
  const navigate = useNavigate();

  console.log(selectedStaffTip);

  function handleSelectStaff(staff) {
    if (selectedStaffTip != null) {
      setStaffListFilter(staffList);
      setSelectedStaffTip(null);
    }
    setSelectedStaffTip(staff);
    setStaffListFilter(staffList.filter((stafff) => stafff.ID === staff.ID));
  }

  useEffect(() => {
    getAllStaff();
  }, []);

  return (
    <Container>
      <Stack>
        <PreviousPageButton />

        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Etape 1 : Choix de l'employé</h1>
          <p className="p-mt-15">
            Veuillez choisir l'employé auquel vous voulez donner un pourboire
          </p>
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
            <Row
              key={index}
              className="d-flex justify-content-center mx-auto "
              onClick={() => handleSelectStaff(staff)}
            >
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
                </Row>
              </Col>
            </Row>
          ))}
        </div>
        <div className="d-flex justify-content-center col-m-25 col-button ">
          <Button
            style={{ marginLeft: "35px", marginRight: "35px" }}
            className="customButton1"
            disabled={selectedStaffTip == null ? true : false}
            onClick={() => {
              const currentUrl = window.location.pathname; // Get the current URL
              const newUrl = currentUrl.replace(
                "/select-staff",
                "/private-home-client/"
              ); // Replace "select-staff" with "test"
              navigate(newUrl);
            }}
          >
            Suivant
          </Button>
        </div>
        <SelectRolePopup />
      </Stack>
    </Container>
  );
}
