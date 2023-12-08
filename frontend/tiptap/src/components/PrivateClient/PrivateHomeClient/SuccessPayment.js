import { Button, Container, Spinner, Stack } from "react-bootstrap";

import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import logo from "../../../images/logo.PNG";
import Success from "../../../images/payment_success_icon.png";
import "../../../style.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useFetchTip } from "../../../fetches/FetchTip";
import { useFetchComment } from "../../../fetches/FetchComment";

function SuccessPayment() {
  const {
    tipAmount,
    restaurantIdParams,
    tipComment,
    selectedStaff,
    transactionId,
    rating,
  } = useStaffContext();
  const fetchTip = useFetchTip();
  const fetchComment = useFetchComment();
  const navigate = useNavigate();
  const amount = tipAmount;
  const restaurantId = restaurantIdParams.current;
  const id_staff = selectedStaff;
  const id_transaction = transactionId ? transactionId : 0;
  const staff_rating = rating;
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
          amount: amount,
          restaurantId: restaurantId,
          id_staff: id_staff,
          id_transaction: id_transaction,
          date: date,
          rating: staff_rating,
        },
      ]),
    refetchOnWindowFocus: false,
  });

  const addCommentMutation = useMutation({
    mutationFn: async () =>
      await fetchComment.addComment([
        {
          tipComment: tipComment,
          id_transaction: id_transaction,
          date: date,
          id_restaurant: restaurantIdParams.current,
          rating: staff_rating,
        },
      ]),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    //On teste si commentaire est nul ou non pour savoir si on ajoute un commentaire
    if (tipComment != "") {
      addCommentMutation.mutate();
    }

    if (tipAmount != 0) {
      if (restaurantIdParams.current != null) {
        addTipMutation.mutate();
      }
    }
  }, []);

  return addTipMutation.isSuccess || addCommentMutation.isSuccess ? (
    <Container className="gx-0 fluid ">
      <Stack>
        <div className=" mx-auto mb-4">
          <img key="star1" className="logo" src={logo} alt="logo" />
        </div>
        <div className=" mx-auto mb-4">
          <p className="payment-success text-center">
            Your tip is greatly appreciated. I hope you had a lovley dining
            experience
          </p>
        </div>
        <div className=" mx-auto mb-4">
          <img src={Success} alt="logo" />
        </div>
        <div className=" mx-auto">
          <p className="payment-success-amount">{`$ ${tipAmount}`} </p>
        </div>
        <div className=" mx-auto mb-4">
          <p className="payment-success-message">
            Your tip has been successfully sent
          </p>
        </div>

        <div className="d-flex justify-content-center col-button button-mt-40">
          <Button
            style={{ marginLeft: "35px", marginRight: "35px" }}
            className="customButton1"
            onClick={() => {
              navigate("/");
            }}
          >
            Back To Home
          </Button>
        </div>
      </Stack>
    </Container>
  ) : (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  );
}

export default SuccessPayment;
