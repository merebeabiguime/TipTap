import React, { useEffect, useRef, useState } from "react";
import { QueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { useFetchAyden } from "../fetches/fetchAyden";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";

const AydenDropIn = (props) => {
  const { details } = props;
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const dropinContainerRef = useRef(null);
  const dropinInstance = useRef(null);
  const sessionId = urlParams.get("sessionId");
  const redirectResult = urlParams.get("redirectResult");
  const PaymentDetails = [{ amount: details.price, returnURL: "test" }];

  const createAydenCheckout = async (sessionParam) => {
    const configuration = {
      environment: "test",
      clientKey: process.env.AYDEN_CLIENT_KEY,
      analytics: {
        enabled: true,
      },
      session: sessionParam,
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true,
        },
      },
    };
    return new AdyenCheckout(sessionParam);
  };

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
        setSession("raesponse du fetch", data.response);
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

    return () => {
      dropinInstance.current && dropinInstance.current.unmount();
    };
  }, []);

  const initializeAydenCheckout = async () => {
    try {
      const checkout = await createAydenCheckout(session);

      if (sessionId && redirectResult) {
        checkout.submitDetails({ details: { redirectResult: redirectResult } });
      }

      dropinInstance.current = checkout
        .create("dropin")
        .mount(dropinContainerRef.current);
    } catch (error) {
      console.log("Error Adyen", error);
    }
  };

  const finalizeCheckout = async () => {
    try {
      const checkout = await createAydenCheckout({ id: sessionId });
      checkout.submitDetails({ details: { redirectResult: redirectResult } });
    } catch (error) {
      console.log("Error Adyen", error);
    }
  };

  useEffect(() => {
    !sessionId && !redirectResult && initializeAydenCheckout();
  }, [session]);

  // Conditionally render the drop-in container
  return session ? <div ref={dropinContainerRef}></div> : null;
};

export default AydenDropIn;
