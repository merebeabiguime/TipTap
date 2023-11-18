import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import IconStar from "../../../images/other_stars.png";
import IconStarUnselected from "../../../images/other_stars_unselected.png";
import Divider from "../../../images/divider.png";
import logo from "../../../images/logo.PNG";
import "../../../style.css";
import QRCode from "react-qr-code";
import StaffCaroussel from "./StaffCaroussel";
import { useEffect, useState } from "react";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import PaypalCheckoutButton from "../../../features/PaypalCheckoutButton";

function PrivateHomeClient() {
  const {
    setTipAmount,
    tipAmount,
    setTipComment,
    tipComment,
    rating,
    setRating,
    getAllStaff,
    selectedStaffTip,
  } = useStaffContext();
  const [selectedPriceTag, setSelectedPriceTag] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [comment, setComment] = useState("");
  const product = {
    description: "TIP to",
    price: tipAmount,
  };

  const selectPriceTag = (amount) => {
    if (selectedPriceTag == 0) {
      setSelectedPriceTag(amount);
      setTipAmount(amount);
      setEnteredAmount("");
    } else {
      if (amount == selectedPriceTag) {
        setSelectedPriceTag(0);
        setTipAmount(0);
      } else {
        setSelectedPriceTag(amount);
        setTipAmount(amount);
        setEnteredAmount("");
      }
    }
  };

  const handleAmountChange = (event) => {
    const inputAmount = event.target.value;

    // Vérifiez si la valeur entrée ne contient que des chiffres
    if (/^\d*\.?\d*$/.test(inputAmount) || inputAmount === "") {
      setEnteredAmount(inputAmount);
      setTipAmount(parseFloat(inputAmount) || 0); // Convertissez la chaîne en nombre ou 0 si la conversion échoue
    }
  };

  const handleCommentChange = (event) => {
    const inputComment = event.target.value;
    setComment(inputComment);
    setTipComment(inputComment);
  };

  const handleRatingClick = (clickedRating) => {
    setRating(clickedRating);
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  return (
    <Container className="gx-0 fluid">
      <Stack>
        <div className=" mx-auto">
          <img key="star1" className="logo" src={logo} alt="logo" />
        </div>
        <StaffCaroussel />
        <div className="mx-auto">
          {[1, 2, 3, 4, 5].map((star) => (
            <img
              key={`star${star}`}
              style={{ width: "16%", height: "6%", marginRight: "7px" }}
              src={star <= rating ? IconStar : IconStarUnselected}
              className="image_selectRole"
              alt="icon"
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
        <div className="mx-auto mb-4">
          <img
            style={{ width: "82%", height: "1px" }}
            src={Divider}
            className="image_selectRole"
            alt="icon"
          />
        </div>
        <div className="mx-auto mb-4">
          <Button
            onClick={() => selectPriceTag("1.25")}
            className={
              tipAmount === 0 || selectedPriceTag != "1.25"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"$ 1.25"}
          </Button>
          <Button
            onClick={() => selectPriceTag("1.50")}
            className={
              tipAmount === 0 || selectedPriceTag != "1.50"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"$ 1.50"}
          </Button>
          <Button
            onClick={() => selectPriceTag("1.75")}
            className={
              tipAmount === 0 || selectedPriceTag != "1.75"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"$ 1.75"}
          </Button>
          <Button
            onClick={() => selectPriceTag("2.00")}
            className={
              tipAmount === 0 || selectedPriceTag != "2.00"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"$ 2.00"}
          </Button>
        </div>

        <div className=" d-flex justify-content-center form-mt-74" sm={12}>
          <Form>
            <InputGroup className="mb-4">
              <Form.Control
                type="text"
                placeholder="Enter Amount"
                className="customForm1"
                style={{ height: "65px" }}
                disabled={selectedPriceTag === 0 ? false : true}
                value={enteredAmount}
                onChange={handleAmountChange}
              />
              <Form.Control
                type="text"
                placeholder="Leave a comment"
                className="customForm1"
                style={{ height: "95px" }}
                value={comment}
                onChange={handleCommentChange}
              />
            </InputGroup>

            <div className="">
              <Button
                disabled={tipAmount === 0 || rating === 0 ? true : false}
                type="submit"
                className="customButton1"
                value={enteredAmount}
              >
                {`Pay ($ ${tipAmount})`}
              </Button>
            </div>
            {tipAmount !== 0 && (
              <div className="justify-content-center mx-auto mt-4">
                <p className="text-center">Or pay with PayPal</p>
                <PaypalCheckoutButton product={product} />
              </div>
            )}
          </Form>
        </div>
      </Stack>
    </Container>
  );
}

export default PrivateHomeClient;
