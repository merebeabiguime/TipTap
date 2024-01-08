import React, { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import PreviousPageButton from "../../features/PreviousPageButton";
import AydenDropIn from "../../features/AydenDropIn";
import { useStaffContext } from "../../contexts/fetches-contexts/StaffContext";
import IconNettoyeur from "../../images/icon_cleaner.png";
import IconCuisinier from "../../images/icon_chef.png";

export default function Checkout() {
  const { selectedStaff, tipAmount, staffListFilter, orderType, orderDetails } =
    useStaffContext();
  const [staffToShow, setStaffToShow] = useState(null);
  const product = {
    description: orderType.current === "tip" ? "TIP to" : "QRCODE ORDER",
    price:
      orderType.current === "tip"
        ? tipAmount
        : orderDetails
        ? orderDetails.current.price
        : 0,
  };

  useEffect(() => {
    console.log(orderDetails.current);
    if (selectedStaff === -1) {
      setStaffToShow({
        role: "Nettoyeur",
        firstName: "",
        lastName: "",
        pictureUrl: { IconNettoyeur },
      });
    }
    if (selectedStaff === 0) {
      setStaffToShow({
        role: "Cuisinier",
        firstName: "",
        lastName: "",
        pictureUrl: { IconCuisinier },
      });
    }
    for (let i = 0; i < staffListFilter.length; i++) {
      if (staffListFilter[i].ID === selectedStaff) {
        setStaffToShow(staffListFilter[i]);
      }
    }
  }, [selectedStaff]);

  return (
    <Container className="gx-0 fluid">
      <Stack style={{ marginRight: "25px", marginLeft: "25px" }}>
        <PreviousPageButton firstTitle="Informations de paiement" />

        {staffToShow && (
          <div
            className="mx-auto"
            style={{ marginTop: "30px", whiteSpace: "pre" }}
          >
            <img
              className=" profile-picture-3"
              src={
                staffToShow.role === "Cuisinier"
                  ? IconCuisinier
                  : staffToShow.role === "Nettoyeur"
                  ? IconNettoyeur
                  : staffToShow.pictureUrl
              }
              alt="photo de profil"
            />

            <h5>{`${staffToShow.firstName}  ${staffToShow.lastName}`}</h5>
            <p className="mx-auto text-center">{staffToShow.role}</p>
          </div>
        )}

        <div className="">
          <div className="justify-content-center mx-auto mt-4">
            <AydenDropIn details={product} />
          </div>
        </div>
      </Stack>
    </Container>
  );
}
