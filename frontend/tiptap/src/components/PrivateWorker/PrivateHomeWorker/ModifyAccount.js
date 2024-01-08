import { useEffect, useRef, useState } from "react";
import "../../../style.css";

import { Container, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { modifyAccountForm } from "../../../constants/FormFields";
import { useUserContext } from "../../../contexts/AuthContext";
import PreviousPageButton from "../../../features/PreviousPageButton";
import UploadingImage from "../../../features/UploadingImage";
import { useFetchUsers } from "../../../fetches/FetchUsers";
import useHookForm from "../../../forms/hook/HookForm";
import ReLoginPopup from "../../popup/ReLoginPopup";

function ModifyAccount() {
  const [inputChanged, setInputChanged] = useState(true);
  const {
    userObject,
    data,
    updateUserEmail,
    userReauthenticated,
    currentUser,
  } = useUserContext();
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const pictureUrl = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const {
    getValue,
    showInputs,
    setInputList,
    setFormIsSuccess,
    setLoading,
    setDisabled,
    getFormIsSucces,
    getFormChanged,
    setCustomError,
  } = useHookForm({
    inputs: modifyAccountForm(
      userObject[0].firstName,
      userObject[0].lastName,
      userObject[0].email,
      userObject[0].phone
    ),
    btnText: "Modifier",
  });
  const fetchUser = useFetchUsers();

  const inputValues = useRef({});
  useEffect(() => {
    if (data.img) {
      setInputChanged(false);
      console.log(data.img);
      pictureUrl.current = data.img;
    }
  }, [data]);

  const modifyUserMutation = useMutation({
    mutationFn: async () => await fetchUser.update([inputValues.current]),
    onSuccess: (data) => {
      if (data.status === "Success") {
        window.location.href = "/privateWorker/private-home-worker";
        setErrorMessage("");
      } else {
        setErrorMessage(data.response);
        console.log(data.response);
        setLoading(false);
        setDisabled(false);
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setDisabled(true);
  }, []);

  const formChanged = getFormChanged();

  useEffect(() => {
    if (formChanged || pictureUrl.current) {
      setDisabled(false);
    }
  }, [formChanged]);

  const isFormSuccessfull = getFormIsSucces();

  const updateEmail = async (email) => {
    if (userReauthenticated) {
      try {
        const result = await updateUserEmail(email);
        console.log("result", result);
        modifyUserMutation.mutate();
      } catch (error) {
        console.log(error);
      }
    } else {
      setDisabled(false);
      setLoading(false);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    console.log("is", isFormSuccessfull);
    if (isFormSuccessfull) {
      setDisabled(true);
      setLoading(true);
      console.log("dedans");

      const firstName = getValue("modifyAccount_firstName");
      const lastName = getValue("modifyAccount_lastName");
      const email = getValue("modifyAccount_email");
      const phoneNumber = getValue("modifyAccount_phoneNumber");
      inputValues.current = {
        firstName: firstName,
        lastName: lastName,
        email: userObject[0].email,
        phoneNumber: phoneNumber,
        pictureUrl: pictureUrl.current,
        ID: userObject[0].ID,
      };
      if (email !== currentUser.email) {
        console.log("tata");
        updateEmail(email);
      } else {
        console.log("didians");
        modifyUserMutation.mutate();
      }
      setFormIsSuccess(false);
    }
  }, [isFormSuccessfull]);

  return (
    <Container>
      <Stack style={{ marginRight: "25px", marginLeft: "25px" }}>
        {showPopup && (
          <ReLoginPopup title="Vous devez vous reconnecter pour pouvoir modifier votre profil" />
        )}
        <PreviousPageButton firstTitle="Modifier le compte" />
        <div className="">
          <p className="p-mt-15">Veuillez entrer vos nouvelles informations.</p>
          {showPopup && (
            <p className="p-mt-15">
              Vous pouvez désormais cliquer sur le boutton Modifier. Un email de
              vérification vous sera envoyé.
            </p>
          )}
        </div>
        <UploadingImage />
        {showInputs()}
        <p>{errorMessage}</p>
      </Stack>
    </Container>
  );
}

export default ModifyAccount;
