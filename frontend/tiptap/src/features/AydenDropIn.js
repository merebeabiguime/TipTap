import React, { useEffect, useRef, useState } from "react";
import { QueryClient, useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchAyden } from "../fetches/fetchAyden";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import { useStaffContext } from "../contexts/fetches-contexts/StaffContext";
import { useFetchEmail } from "../fetches/FetchEmail";
import { render } from "@react-email/components";
import FirstTemplate from "../email_templates/FirstTemplate";

const AydenDropIn = (props) => {
  const { details } = props;
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dropinContainerRef = useRef(null);
  const dropinInstance = useRef(null);
  const sessionId = urlParams.get("sessionId");
  const redirectResult = urlParams.get("redirectResult");
  const PaymentDetails = [{ amount: details.price, returnURL: "test" }];
  const navigate = useNavigate();
  const {
    restaurantIdParams,
    setTransactionId,
    selectedStaff,
    tipAmount,
    rating,
    orderType,
  } = useStaffContext();

  const [session, setSession] = useState(null);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const fetchAyden = useFetchAyden();
  const fetchAydenSession = async () => {
    try {
      const data = await queryClient.fetchQuery(["aydenSession"], {
        queryFn: async () => await fetchAyden.getSession(PaymentDetails),
      });

      if (data.status === "Success") {
        console.log("il y a eu un succes", data.response);
        setSession(data.response);
        setTransactionId(data.response.reference);
      } else {
        console.log("Erreur du fetch", data.response);
      }
    } catch (e) {
      console.log("catch dans le fetch", e);
    }
  };

  useEffect(() => {
    console.log(details);
    fetchAydenSession();

    if (sessionId && redirectResult) {
      finalizeCheckout();
    }
  }, []);

  useEffect(() => {
    !sessionId &&
      !redirectResult &&
      session !== null &&
      initializeAydenCheckout();
  }, [session, sessionId, redirectResult]);

  const fetchEmail = useFetchEmail();
  const emailMutation = useMutation({
    mutationFn: async () =>
      await fetchEmail.sendEmail([
        {
          idStaff: selectedStaff,
          idRestaurant: restaurantIdParams.current,
          html: render(
            <FirstTemplate details={{ amount: tipAmount, rating: rating }} />
          ),
        },
      ]),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("onSuccess", data.response);
      navigate(`/privateClient/${restaurantIdParams.current}/success-payment`);
    },
  });

  const initializeAydenCheckout = async () => {
    try {
      console.log("dans le initizialise");

      const configuration = {
        environment: "test",
        clientKey: "test_3VKOQZ63JVG6FFO5KTKKFAU5GASVPYSK",
        session: session,
        onPaymentCompleted: (result, component) => {
          switch (orderType.current) {
            case "tip": {
              if ((result.resultCode = "Authorised")) {
                emailMutation.mutate();
              }
              break;
            }
            case "qrcode": {
              navigate("/privateManager/private-home-manager/success-payment");
              break;
            }
          }
        },
        onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
        },
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: false,
            holderNameRequired: false,
            billingAddressRequired: false,
          },
        },
      };

      const checkout = await AdyenCheckout(configuration);

      if (sessionId && redirectResult) {
        checkout.submitDetails({ details: { redirectResult: redirectResult } });
      }
      checkout.create("dropin").mount(dropinContainerRef.current);
    } catch (error) {
      console.log("Error Adyen", error);
    }
  };

  const finalizeCheckout = async () => {
    try {
      const configuration = {
        environment: "test",
        clientKey: "test_3VKOQZ63JVG6FFO5KTKKFAU5GASVPYSK",
        session: { id: sessionId },
        onPaymentCompleted: (result, component) => {
          switch (orderType.current) {
            case "tip": {
              if ((result.resultCode = "Authorised")) {
                emailMutation.mutate();
              }
              break;
            }
            case "qrcode": {
              navigate("/privateManager/private-home-manager/success-payment");
              break;
            }
          }
        },
        onError: (error, component) => {
          console.error(error.name, error.message, error.stack, component);
        },
        paymentMethodsConfiguration: {
          card: {
            hasHolderName: false,
            holderNameRequired: false,
            billingAddressRequired: false,
          },
        },
      };
      const checkout = await AdyenCheckout(configuration);
      checkout.submitDetails({ details: { redirectResult: redirectResult } });
    } catch (error) {
      console.log("Error Adyen", error);
    }
  };

  // Conditionally render the drop-in container
  return session && !sessionId && !redirectResult ? (
    <div ref={dropinContainerRef}></div>
  ) : null;
};

export default AydenDropIn;
