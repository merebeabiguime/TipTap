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

export default function AllStaff() {
  const [staffList, setStaffList] = useState([{}]);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const [clicked, setClicked] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const updateStaffList = async () => {
    const newStaffList = [];
    try {
      const getStaffResponse = await getAllStaff();

      if (getStaffResponse.status === "Success") {
        for (var i = 0; i < getStaffResponse.response.length; i++) {
          const getUserResponse = await getUser(
            getStaffResponse.response[i].ID_user
          );
          if (getUserResponse.status === "Success") {
            let roleName = "";
            console.log("i" + i);
            console.log(
              "id firsname :" + getStaffResponse.response[0].firstName
            );

            if (getStaffResponse.response[i].role === 1) {
              roleName = "Chef";
            } else if (getStaffResponse.response[i].role === 2) {
              roleName = "Waiter";
            } else if (getStaffResponse.response[i].role === 3) {
              roleName = "Cleaner";
            }
            newStaffList.push({
              role: roleName,
              stars: getStaffResponse.response[i].stars,
              firstName: getUserResponse.response[0].firstName,
              lastName: getUserResponse.response[0].lastName,
              pictureUrl: getUserResponse.response[0].pictureUrl,
            });
          }
        }
        setStaffList(newStaffList);
        setStaffListFilter(newStaffList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateStaffList();
  }, []);

  const [roleFilter, setRoleFilter] = useState("");
  const [staffListFilter, setStaffListFilter] = useState([{}]);

  function updateStaffListFilter() {
    if (roleFilter === "") {
      setStaffListFilter(staffList);
    } else {
      const newStaffList = staffList.filter(
        (staff) => staff.role === roleFilter
      );
      setStaffListFilter(newStaffList);
    }
  }

  useEffect(() => {
    updateStaffListFilter();
  }, [roleFilter]);

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
        <div className={`popup ${isPopupVisible ? "show" : ""}`}>
          <h1 className="justify-content-center d-flex col-m-25">
            Select Role
          </h1>
          <Button
            onClick={() => {
              setRoleFilter("Waiter");
              setClicked(!clicked);
            }}
            type="submit"
            className="popup-button-gray"
          >
            Waiter's
          </Button>
          <Button
            onClick={() => {
              setRoleFilter("Cleaner");
              setClicked(!clicked);
            }}
            type="submit"
            className="popup-button-gray"
          >
            Cleaner's
          </Button>
          <Button
            onClick={() => {
              setRoleFilter("Chef");
              setClicked(!clicked);
            }}
            type="submit"
            className="popup-button-gray"
          >
            Chef's
          </Button>
          <Button
            onClick={() => {
              setRoleFilter("");
              setClicked(!clicked);
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
      </Row>
    </div>
  );
}
