import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import { useEffect, useState } from "react";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import PaypalCheckoutButton from "../../../features/PaypalCheckoutButton";
import Divider from "../../../images/divider.png";
import logo from "../../../images/logo.png";
import IconStar from "../../../images/other_stars.png";
import IconStarUnselected from "../../../images/other_stars_unselected.png";
import "../../../style.css";
import StaffCaroussel from "./StaffCaroussel";
import AydenDropIn from "../../../features/AydenDropIn";
import { useNavigate } from "react-router-dom";

function PrivateHomeClient() {
  const {
    setTipAmount,
    tipAmount,
    setTipComment,
    rating,
    setRating,
    getAllStaff,
    selectedStaff,
    restaurantIdParams,
    orderType,
  } = useStaffContext();
  const [selectedPriceTag, setSelectedPriceTag] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [comment, setComment] = useState("");
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (tipAmount !== 0) {
      setProduct({
        description: "TIP to",
        price: tipAmount,
      });
    }
  }, [tipAmount]);

  const selectPriceTag = (amount) => {
    if (selectedPriceTag === 0) {
      setSelectedPriceTag(amount);
      setTipAmount(amount);
      setEnteredAmount("");
    } else {
      if (amount === selectedPriceTag) {
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
      setSelectedPriceTag(0);
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

  const increasePrice = () => {
    if (selectedPriceTag === 0) {
      const newAmount = (parseFloat(enteredAmount) || 0) + 0.25;
      setEnteredAmount(newAmount.toFixed(2)); // Limitez le nombre de décimales à deux
      setTipAmount(newAmount);
    }
  };

  const decreasePrice = () => {
    if (selectedPriceTag === 0) {
      const newAmount = Math.max((parseFloat(enteredAmount) || 0) - 0.25, 0);
      setEnteredAmount(newAmount.toFixed(2));
      setTipAmount(newAmount);
    }
  };

  useEffect(() => {
    getAllStaff();
    orderType.current = "tip";
  }, []);

  const handlePayButton = () => {
    navigate(
      `/privateClient/restaurantId=${restaurantIdParams.current}/adyen/`
    );
  };

  return (
    <Container className="gx-0 fluid">
      <Stack style={{ marginRight: "25px", marginLeft: "25px" }}>
        <div className=" mx-auto">
          <img key="star1" className="logo" src={logo} alt="logo" />
        </div>
        <p style={{ marginTop: "25px" }}>
          {" "}
          Choisissez à qui vous souhaitez envoyer votre pourboire.
        </p>
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
            onClick={() => {
              selectPriceTag("1.25");
              setEnteredAmount("");
            }}
            className={
              tipAmount === 0 || selectedPriceTag !== "1.25"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"1.25 €"}
          </Button>
          <Button
            onClick={() => {
              selectPriceTag("1.50");
              setEnteredAmount("");
            }}
            className={
              tipAmount === 0 || selectedPriceTag !== "1.50"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"1.50 €"}
          </Button>
          <Button
            onClick={() => {
              selectPriceTag("1.75");
              setEnteredAmount("");
            }}
            className={
              tipAmount === 0 || selectedPriceTag !== "1.75"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"1.75 €"}
          </Button>
          <Button
            onClick={() => {
              selectPriceTag("2.00");
              setEnteredAmount(null);
            }}
            className={
              tipAmount === 0 || selectedPriceTag !== "2.00"
                ? `price-button`
                : ` price-button_focus `
            }
          >
            {"2.00 €"}
          </Button>
        </div>

        <div className=" d-flex justify-content-center form-mt-74">
          <Form>
            <InputGroup className="mb-4">
              <Row className=" mx-auto align-items-center d-flex mb-2">
                <Button
                  onClick={decreasePrice}
                  className="col-2 changePriceButton mx-auto d-flex align-items-center"
                >
                  -
                </Button>
                <div className="col-8">
                  <Form.Control
                    type="text"
                    inputMode="numeric"
                    placeholder="Entrer le montant"
                    className="customPriceForm "
                    value={enteredAmount}
                    onChange={handleAmountChange}
                  />
                </div>
                <Button
                  onClick={increasePrice}
                  className="col-2 changePriceButton mx-auto d-flex align-items-center"
                >
                  +
                </Button>
              </Row>
              <Form.Control
                type="text"
                placeholder="Laisser un commentaire"
                className="customForm1"
                style={{ height: "95px" }}
                value={comment}
                onChange={handleCommentChange}
              />
            </InputGroup>

            <div className="">
              {comment === "" ? (
                <Button
                  disabled={
                    tipAmount === 0 || rating === 0 || selectedStaff == null
                      ? true
                      : false
                  }
                  type="submit"
                  className="customButton1"
                  value={enteredAmount}
                  onClick={() => {
                    handlePayButton();
                  }}
                >
                  {`Aller au paiement (${tipAmount}) €`}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="customButton1"
                  value={enteredAmount}
                >
                  Envoyer le commentaire
                </Button>
              )}
            </div>

            {tipAmount !== 0 &&
              selectedStaff !== null &&
              rating !== 0 &&
              product && (
                <div>
                  <div className="justify-content-center mx-auto mt-4">
                    <p className="text-center">Ou payer avec Paypal</p>
                    <PaypalCheckoutButton product={product} />
                  </div>
                </div>
              )}
          </Form>
        </div>
      </Stack>
    </Container>
  );
}

export default PrivateHomeClient;
