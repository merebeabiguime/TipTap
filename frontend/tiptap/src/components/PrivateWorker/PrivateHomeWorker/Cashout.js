import { useUserContext } from "../../../contexts/AuthContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import bicIcon from "../../../images/bic_icon.png";
import ibanIcon from "../../../images/iban_icon.png";
import userIcon from "../../../images/user_icon.png";
import "../../../style.css";

import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";

function Cashout() {
  const { userObject } = useUserContext();

  return (
    <Container>
      <Stack>
        <PreviousPageButton title={{ title: "Opérations" }} />
        <div
          className="mx-auto"
          style={{ marginTop: "30px", whiteSpace: "pre" }}
        >
          <img
            className=" profile-picture-3"
            src={userObject[0].pictureUrl}
            alt="photo de profil"
          />

          <h5>{`${userObject[0].firstName}  ${userObject[0].lastName}`}</h5>
        </div>
        <div className="mx-auto text-center account_balance align-items-center d-flex justify-content-center">
          Balance {`${userObject[0].balance} €`}
        </div>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Saisir les détails</h1>
        </div>
        <div className=" d-flex justify-content-center mt-4">
          <Form>
            <InputGroup>
              <img className="iconForm" src={userIcon} alt="Nom" />
              <Form.Control
                type="text"
                placeholder="Nom complet"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={ibanIcon} alt="IBAN" />
              <Form.Control
                type="text"
                placeholder="IBAN"
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={bicIcon} alt="BIC" />
              <Form.Control
                type="text"
                placeholder="BIC"
                className="customForm"
              />
            </InputGroup>
            <Button type="submit" className="customButton1">
              Transférer
            </Button>
          </Form>
        </div>
      </Stack>
    </Container>
  );
}

export default Cashout;
