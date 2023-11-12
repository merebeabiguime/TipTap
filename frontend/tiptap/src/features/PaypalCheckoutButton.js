import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useStaffContext } from "../contexts/fetches-contexts/StaffContext";

const PaypalCheckoutButton = (props) => {
  const { restaurantIdParams } = useStaffContext();
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleApprove = (orderID) => {
    //Call backend to fulfill the order
    setPaidFor(true);
    //Refresh user account
  };

  useEffect(() => {
    if (paidFor) {
      navigate(`/privateClient/${restaurantIdParams.current}/success-payment`);
      // Avoid updating state during rendering
      // setPaidFor(false);
    }
  }, [paidFor]);

  if (error) {
    //Display error message
    alert("Erorr");
  }
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.description,
              amount: { value: product.price },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        handleApprove(data.orderID);
      }}
      onError={(err) => {
        setError(err);
      }}
      onCancel={() => {
        //Back to cart
      }}
    />
  );
};
export default PaypalCheckoutButton;
