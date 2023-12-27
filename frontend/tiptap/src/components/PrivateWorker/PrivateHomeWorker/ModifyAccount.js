import { useEffect, useRef, useState } from "react";
import MailIcon from "../../../images/signup_mail_icon.png";
import PasswordIcon from "../../../images/signup_password_icon.png";
import PhoneIcon from "../../../images/signup_phone_icon.png";
import UserIcon from "../../../images/signup_user_icon.png";
import "../../../style.css";

import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useFetchUsers } from "../../../fetches/FetchUsers";
import { useUserContext } from "../../../contexts/AuthContext";
import UploadingImage from "../../../features/UploadingImage";
import PreviousPageButton from "../../../features/PreviousPageButton";

function ModifyAccount() {
  const [inputChanged, setInputChanged] = useState(true);
  const { userObject, data } = useUserContext();
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fetchUser = useFetchUsers();
  const inputValues = useRef({
    firstName: userObject[0].firstName,
    lastName: userObject[0].lastName,
    email: userObject[0].email,
    phoneNumber: userObject[0].phone,
    pictureUrl: userObject[0].pictureUrl,
    ID: userObject[0].ID,
  });
  useEffect(() => {
    if (data.img) {
      setInputChanged(false);
      console.log(data.img);
      inputValues.current.pictureUrl = data.img;
    }
  }, [data]);
  const onChangeInput = (value, index) => {
    console.log("changed", value.nativeEvent.data);
    setInputChanged(false);

    inputValues.current[index] = value.nativeEvent.data;
  };

  const modifyUserMutation = useMutation({
    mutationFn: async () => await fetchUser.update([inputValues.current]),
    onSuccess: (data) => {
      if (data.status === "Success") {
        window.location.href = "/privateWorker/private-home-worker";
        setErrorMessage("");
      } else {
        setErrorMessage(data.response);
        console.log(data.response);
      }
    },
    refetchOnWindowFocus: false,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (!inputChanged) {
      modifyUserMutation.mutate();
    }
  };

  return (
    <Container>
      <Stack>
        <PreviousPageButton />
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h1 className="h1-mt-33">Modifier le compte</h1>
          <p className="p-mt-15">Veuillez entrer vos nouvelles informations</p>
        </div>
        <UploadingImage />
        <div className=" d-flex justify-content-center mt-4">
          <Form onSubmit={handleOnSubmit} ref={formRef}>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                onChange={(value) => {
                  onChangeInput(value, "firstName");
                }}
                type="text"
                placeholder={userObject[0].firstName}
                className="customForm"
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={UserIcon} alt="User" />
              <Form.Control
                type="text"
                onChange={(value) => {
                  onChangeInput(value, "lastName");
                }}
                className="customForm"
                value={userObject[0].lastName}
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={MailIcon} alt="User" />
              <Form.Control
                type="email"
                placeholder={userObject[0].email}
                onChange={(value) => {
                  onChangeInput(value, "email");
                }}
                className="customForm"
                value={userObject[0].email}
              />
            </InputGroup>
            <InputGroup>
              <img className="iconForm" src={PhoneIcon} alt="User" />
              <Form.Control
                type="text"
                placeholder={userObject[0].phone}
                value={userObject[0].phone}
                onChange={(value) => {
                  onChangeInput(value, "phoneNumber");
                }}
                className="customForm"
              />
            </InputGroup>
            <p className="text-danger mt-1">{errorMessage}</p>
            <Button
              type="submit"
              className="customButton1"
              disabled={inputChanged}
            >
              Modifier
            </Button>
          </Form>
        </div>
      </Stack>
    </Container>
  );
}

export default ModifyAccount;
