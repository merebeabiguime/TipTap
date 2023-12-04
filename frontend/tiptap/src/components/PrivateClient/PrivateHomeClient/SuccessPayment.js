import { Button, Container, Stack } from "react-bootstrap";

import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import logo from "../../../images/logo.PNG";
import Success from "../../../images/payment_success_icon.png";
import "../../../style.css";
import { useNavigate } from "react-router-dom";

function SuccessPayment() {
  const { tipAmount, restaurantIdParams } = useStaffContext();
  const navigate = useNavigate();

  return (
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
  );
}

export default SuccessPayment;
