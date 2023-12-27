import React, { useEffect, useState } from "react";
import { Button, Container, Spinner, Stack } from "react-bootstrap";
import { useStaffContext } from "../../contexts/fetches-contexts/StaffContext";
import { useFetchTip } from "../../fetches/FetchTip";
import { useFetchComment } from "../../fetches/FetchComment";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import PaymentSuccessIcon from "../../images/payment_success_icon.png";
import IconNettoyeur from "../../images/icon_cleaner.png";
import IconCuisinier from "../../images/icon_chef.png";
import logo from "../../images/logo.png";
import { useFetchOrders } from "../../fetches/FetchOrders";

export default function SuccessPayment() {
  const {
    orderType,
    tipAmount,
    restaurantIdParams,
    selectedStaff,
    transactionId,
    rating,
    tipComment,
    orderDetails,
    staffListFilter,
  } = useStaffContext();
  const [mainMessage, setMainMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fetchTip = useFetchTip();
  const navigate = useNavigate();
  const [staffToShow, setStaffToShow] = useState(null);
  const fetchComment = useFetchComment();
  const fetchOrders = useFetchOrders();
  /*Current Date */
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const date = formattedDate;

  const addTipMutation = useMutation({
    mutationFn: async () =>
      await fetchTip.addTip([
        {
          amount: tipAmount,
          restaurantId: restaurantIdParams.current,
          id_staff: selectedStaff,
          id_transaction: transactionId,
          date: date,
          rating: rating,
        },
      ]),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  const addCommentMutation = useMutation({
    mutationFn: async () =>
      await fetchComment.addComment([
        {
          tipComment: tipComment,
          id_transaction: transactionId,
          date: date,
          id_restaurant: restaurantIdParams.current,
          rating: rating,
          id_staff: selectedStaff,
        },
      ]),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });
  const addOrderMutation = useMutation({
    mutationFn: async () => await fetchOrders.addOrder([orderDetails]),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    switch (orderType.current) {
      case "tip": {
        setMainMessage(`Merci ! `);
        switch (selectedStaff) {
          case -1: {
            setSuccessMessage(
              `Vous venez de faire sourire l'équipe de nettoyage en leur envoyant un pourboire d'une valeur de : `
            );
            break;
          }
          case 0: {
            setSuccessMessage(
              `Vous venez de faire sourire l'équipe des cuisiniers en leur envoyant un pourboire d'une valeur de :`
            );
            break;
          }
          default: {
            for (let i = 0; i < staffListFilter.length; i++) {
              if (staffListFilter[i].ID === selectedStaff) {
                setStaffToShow(staffListFilter[i]);
              }
            }
            setSuccessMessage(
              `Vous venez de faire sourire ${staffToShow.firstName} ${staffToShow.lastName} en lui envoyant un pourboire d'une valeur de :`
            );
            break;
          }
        }

        break;
      }
      case "qrCode": {
        setMainMessage(`Votre qr code vous a été envoyé avec succès`);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if (orderType.current === "tip") {
      if (tipComment !== "") {
        addCommentMutation.mutate();
      }

      if (tipAmount !== 0) {
        if (restaurantIdParams.current != null) {
          addTipMutation.mutate();
        }
      }
    }
  }, [tipComment, tipAmount]);

  useEffect(() => {
    if (orderType.current === "qrCode") {
      if (orderDetails) {
        addOrderMutation.mutate();
      }
    }
  }, [orderDetails]);
  return (orderType.current === "tip" &&
    !addTipMutation.isSuccess &&
    !addCommentMutation.isSuccess) ||
    (orderType.current === "qrCode" && !addOrderMutation.isSuccess) ? (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  ) : (
    <Container className="gx-0">
      <Stack>
        <div className=" mx-auto">
          <img key="star1" className="mt-4 logo" src={logo} alt="logo" />
        </div>
        <div className=" mx-auto mb-4">
          <p className="payment-success text-center" style={{ margin: "20px" }}>
            {mainMessage}
          </p>
        </div>
        <div className=" mx-auto mb-4">
          <img
            className={
              staffToShow.role !== "Cuisinier" &&
              staffToShow.role !== "Nettoyeur" &&
              " profile-picture-3"
            }
            src={
              staffToShow.role === "Cuisinier"
                ? IconCuisinier
                : staffToShow.role === "Nettoyeur"
                ? IconNettoyeur
                : staffToShow.pictureUrl
            }
            alt="photo de profil"
          />
        </div>
        <div className=" mx-auto">
          <p className="payment-success-amount">
            {`${
              tipAmount
                ? tipAmount
                : orderDetails.current
                ? orderDetails.current.price
                : 0
            }€`}{" "}
          </p>
        </div>
        <div className=" mx-auto mb-4">
          <p className="payment-success-message">{successMessage}</p>
        </div>

        <div className="d-flex justify-content-center col-button button-mt-40">
          <Button
            style={{ marginLeft: "35px", marginRight: "35px" }}
            className="customButton1"
            onClick={() => {
              navigate("/");
            }}
          >
            Retournner à l'accueil
          </Button>
        </div>
      </Stack>
    </Container>
  );
}
