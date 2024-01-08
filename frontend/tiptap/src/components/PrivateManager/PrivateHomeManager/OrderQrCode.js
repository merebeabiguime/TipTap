import { useUserContext } from "../../../contexts/AuthContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import bicIcon from "../../../images/bic_icon.png";
import ibanIcon from "../../../images/iban_icon.png";
import userIcon from "../../../images/user_icon.png";
import { CountryDropdown } from "react-country-region-selector";
import "../../../style.css";
import PhoneInput from "react-phone-input-2";
import { v4 as uuidv4 } from "uuid";

import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useStaffContext } from "../../../contexts/fetches-contexts/StaffContext";
import { useNavigate } from "react-router-dom";
import { orderQrcodeForm } from "../../../constants/FormFields";
import useHookForm from "../../../forms/hook/HookForm";

function OrderQrCode() {
  const { tipAmount, setTipAmount, orderDetails, orderType } =
    useStaffContext();
  const { userObject } = useUserContext();
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const {
    getValue,
    showInputs,
    setInputList,
    setLoading,
    setDisabled,
    getFormIsSucces,
  } = useHookForm({
    inputs: orderQrcodeForm(),
    btnText: `Passer au paiement ${price}€`,
  });

  useEffect(() => {
    orderType.current = "qrcode";
  }, []);

  const qrCodeQuantity = getValue("orderqrcode_selectQuantity");

  useEffect(() => {
    if (qrCodeQuantity) {
      const roleMap = [27.5, 39.5, 46.8, 54, 60.5, 74];
      setPrice(roleMap[qrCodeQuantity]);
    }
  }, [qrCodeQuantity]);

  const formIsSuccess = getFormIsSucces();

  useEffect(() => {
    if (formIsSuccess) {
      const qrCodeNbr = [10, 20, 30, 40, 50, 75];
      const orderRef = uuidv4();
      const country = getValue("orderqrcode_country");
      const email = getValue("orderqrcode_email");
      const firstName = getValue("orderqrcode_firstName");
      const lastName = getValue("orderqrcode_lastName");
      const phone = getValue("orderqrcode_phone");
      const street = getValue("orderqrcode_street");
      const appartment = getValue("orderqrcode_appartment");
      const postalCode = getValue("orderqrcode_postalCode");

      orderDetails.current = {
        country: country,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        street: street,
        appartment: appartment ? appartment : "",
        postalCode: postalCode,
        price: price,
        qrcodeNbr: qrCodeNbr[qrCodeQuantity],
        qrcodeUrl: `https://tiptap.biz/privateClient/restaurantId=${userObject[0].id_restaurant}/private-home-client/`,
        id_restaurant: userObject[0].id_restaurant,
        orderId: orderRef,
      };
      navigate("/privateManager/private-home-manager/adyen/");
    }
  }, [formIsSuccess]);

  return (
    <Container className="gx-0 fluid ">
      <Stack style={{ marginRight: "25px", marginLeft: "25px" }}>
        <PreviousPageButton firstTitle="Informations de livraison" />
        <div className=" d-flex justify-content-center mt-4">
          {showInputs()}
        </div>
      </Stack>
    </Container>
  );
}

export default OrderQrCode;
