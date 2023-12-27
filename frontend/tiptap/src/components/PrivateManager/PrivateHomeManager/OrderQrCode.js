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

function OrderQrCode() {
  const { tipAmount, setTipAmount, orderDetails, orderType } =
    useStaffContext();
  const { userObject } = useUserContext();
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const inputs = useRef([]);
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(0); // valeur initiale
  const [price, setPrice] = useState(27.5);
  const navigate = useNavigate();

  useEffect(() => {
    orderType.current = "qrcode";
  }, []);

  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    console.log("legnth", inputs.current.length);

    if (!phoneNumber) {
      setErrorMessage("Veuillez saisir un numéro de téléphone");
      return;
    } else if (!country) {
      setErrorMessage("Veuillez sélectionner un pays");
      return;
    } else if (!inputs.current[0]) {
      setErrorMessage("Veuillez saisir une adresse email");
      return;
    } else if (!inputs.current[2]) {
      setErrorMessage("Veuillez saisir votre prénom");
      return;
    } else if (!inputs.current[1]) {
      setErrorMessage("Veuillez saisir votre nom");
      return;
    } else if (!inputs.current[3]) {
      setErrorMessage("Veuillez entrer une ville");
      return;
    } else if (!inputs.current[5]) {
      setErrorMessage("Veuillez entrer votre code postale");
      return;
    } else if (!price) {
      setErrorMessage(
        "Veuillez sélectionner la quantité de Qr Code que vous souhaitez commander"
      );
      return;
    }

    const qrCodeNbr = [10, 20, 30, 40, 50, 75];
    const orderRef = uuidv4();

    orderDetails.current = {
      country: country,
      email: inputs[0],
      firstName: inputs[2],
      lastName: inputs[1],
      phoneNumber: phoneNumber,
      street: inputs[3],
      appartment: inputs[4] ? inputs[4] : "",
      postalCode: inputs[5],
      price: price,
      qrcodeNbr: qrCodeNbr[quantity],
      qrcodeUrl: `https://tiptap.biz/privateClient/restaurantId=${userObject[0].id_restaurant}/private-home-client/`,
      id_restaurant: userObject[0].id_restaurant,
      orderId: orderRef,
    };
    navigate("/privateManager/private-home-manager/adyen/");
  };
  const handleQuantityChange = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
    const roleMap = [27.5, 39.5, 46.8, 54, 60.5, 74];
    setPrice(roleMap[selectedQuantity]);
  };

  return (
    <Container className="gx-0 fluid ">
      <Stack>
        <PreviousPageButton title={{ title: "Adresse de livraison" }} />
        <div className=" d-flex justify-content-center mt-4">
          <Form ref={formRef} onSubmit={handleOnSubmit}>
            <InputGroup className="text-center ">
              <p className="col-12 text-center">Quantité de QR Codes :</p>
              <Form.Select
                onChange={handleQuantityChange}
                value={quantity}
                className="customForm"
              >
                <option value={0}>10 QR Code</option>
                <option value={1}>20 QR Codes</option>
                <option value={2}>30 QR Codes</option>
                <option value={3}>40 QR Codes</option>
                <option value={4}>50 QR Codes</option>
                <option value={5}>75 QR Codes</option>
              </Form.Select>
            </InputGroup>
            <CountryDropdown
              value={country}
              onChange={(val) => setCountry(val)}
              classes="customForm5"
              placeholder="Pays"
            />
            <InputGroup>
              <img className="iconForm" src={userIcon} alt="Email" />
              <Form.Control
                type="text"
                placeholder="Email*"
                className="customForm"
                ref={addInput}
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={userIcon} alt="Nom" />
              <Form.Control
                type="text"
                placeholder="Nom*"
                className="customForm"
                ref={addInput}
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={userIcon} alt="Prénom" />
              <Form.Control
                type="text"
                placeholder="Prénom*"
                className="customForm"
                ref={addInput}
              />
            </InputGroup>
            <p className="col-12 text-center">Téléphone:</p>
            <PhoneInput
              country={"fr"}
              value={phoneNumber}
              onChange={(val) => {
                setPhoneNumber(val);
              }}
              specialLabel=""
              placeholder="Téléphone"
              inputClass="customForm"
            />

            <InputGroup>
              <img className="iconForm" src={userIcon} alt="Rue" />
              <Form.Control
                type="text"
                placeholder="Nom et numéro de rue*"
                className="customForm"
                ref={addInput}
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={userIcon} alt="Appartement" />
              <Form.Control
                type="text"
                placeholder="Numéro étage/Appartement(Optionnel)"
                className="customForm"
                ref={addInput}
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={userIcon} alt="Code postale" />
              <Form.Control
                type="text"
                placeholder="Code Postale*"
                className="customForm"
                ref={addInput}
              />
            </InputGroup>
            <p className="text-danger mt-1">{errorMessage}</p>
            <Button type="submit" className="customButton1">
              Passer au paiement
            </Button>
          </Form>
        </div>
      </Stack>
    </Container>
  );
}

export default OrderQrCode;
