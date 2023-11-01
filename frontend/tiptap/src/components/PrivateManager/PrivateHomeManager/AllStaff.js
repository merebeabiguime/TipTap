import axios from "axios";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DeleteButton from "../../../images/delete_staff_button.png";
import EditButton from "../../../images/edit_staff_button.png";

export default function AllStaff() {
  const [staffList, setStaffList] = useState([{}]);

  const asyncFn = async () => {
    const newStaffList = [];
    try {
      const response = await axios.get(`http://localhost:8081/staff/`);

      for (var i = 0; i < response.data.length; i++) {
        const response1 = await axios.get(
          `http://localhost:8081/user/${response.data[i].ID_user}`
        );
        let roleName = "";
        console.log("i" + i);
        console.log("id firsname :" + response1.data[0].firstName);

        if (response.data[i].role === 1) {
          roleName = "Chef";
        } else if (response.data[i].role === 2) {
          roleName = "Waiter";
        } else if (response.data[i].role === 3) {
          roleName = "Cleaner";
        }
        newStaffList.push({
          role: roleName,
          stars: response.data[i].stars,
          firstName: response1.data[0].firstName,
          lastName: response1.data[0].lastName,
          pictureUrl: response1.data[0].pictureUrl,
        });
      }
      setStaffList(newStaffList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    asyncFn();
  }, []);

  return (
    <div>
      <Row>
        <Col className="d-flex justify-content-center col-m-25" sm={12}>
          <h2 className="col-m-25">All Staff </h2>
        </Col>
        <Col className="">
          {staffList.map((staff, index) => (
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
                      <span>Test</span>
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
      </Row>
    </div>
  );
}
