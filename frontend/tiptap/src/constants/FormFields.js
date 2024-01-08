import MailIcon from "../images/signup_mail_icon.png";
import PasswordIcon from "../images/signup_password_icon.png";
import PhoneIcon from "../images/signup_phone_icon.png";
import UserIcon from "../images/signup_user_icon.png";
export function signupForm() {
  return [
    {
      name: "firstName",
      required: "Veuillez entrer votre nom",
      type: "text",
      placeholder: "Prénom",
      img: { UserIcon },
    },
    {
      name: "lastName",
      required: "Veuillez entrer votre prénom",
      type: "text",
      placeholder: "Nom",
      img: { UserIcon },
    },
    {
      name: "email",
      required: "Veuillez entrer votre adresse email",
      type: "email",
      placeholder: "Email",
      img: { UserIcon },
    },
    {
      name: "phoneNumber",
      required: "Veuillez entrer votre numéro de téléphone",
      type: "phone",
    },
    {
      name: "password1",
      required: "Veuillez entrer votre mot de passe",
      type: "password",
      placeholder: "Mot de passe",
      img: { UserIcon },
    },
    {
      name: "password2",
      required: "Veuillez entrer votre mot de passe",
      type: "password",
      placeholder: "Vérifier le mot de passe",
      img: { UserIcon },
    },
  ];
}

export function signInForm() {
  return [
    {
      name: "signIn_email",
      required: "Veuillez entrer votre adresse email",
      type: "email",
      placeholder: "Email",
      img: { MailIcon },
    },
    {
      name: "signIn_password",
      required: "Veuillez entrer votre mot de passe",
      type: "password",
      placeholder: "Mot de passe",
      img: { PasswordIcon },
    },
  ];
}

export function modifyAccountForm(firstName, lastName, email, phoneNumber) {
  return [
    {
      name: "modifyAccount_firstName",
      type: "text",
      defaultValue: { firstName },
      img: { UserIcon },
      required: "Veuillez entrer un prénom",
    },
    {
      name: "modifyAccount_lastName",
      type: "text",
      defaultValue: { lastName },
      img: { UserIcon },
      required: "Veuillez entrer un nom",
    },
    {
      name: "modifyAccount_email",
      required: "Veuillez entrer une adresse email",
      type: "email",
      defaultValue: { email },
      img: { MailIcon },
    },
    {
      name: "modifyAccount_phoneNumber",
      required: "Veuillez entrer un numéro de téléphone",
      type: "text",
      defaultValue: { phoneNumber },
      img: { PhoneIcon },
    },
  ];
}

export function resetPasswordForm() {
  return [
    {
      name: "resetPassword_password1",
      type: "password",
      img: { PasswordIcon },
      placeholder: "Mot de passe",
      required: "Veuillez entrer un mot de passe",
    },
    {
      name: "resetPassword_password2",
      type: "password",
      placeholder: "Confirmer le mot de passe",
      img: { PasswordIcon },
      required: "Veuillez entrer un mot de passe",
    },
  ];
}

export function orderQrcodeForm() {
  const selectQuantity = [
    { value: null, description: "Quantité" },
    { value: 0, description: "10 QR Code" },
    { value: 1, description: "20 QR Code" },
    { value: 2, description: "30 QR Code" },
    { value: 3, description: "40 QR Code" },
    { value: 4, description: "50 QR Code" },
    { value: 5, description: "75 QR Code" },
  ];
  return [
    {
      name: "orderqrcode_selectQuantity",
      type: "select",
      childrens: { selectQuantity },
      required: "Veuillez choisir une quantité",
    },
    {
      name: "orderqrcode_country",
      type: "country",
      placeholder: "Selectionner un pays",
      required: "Veuillez choisir un pays",
    },
    {
      name: "orderqrcode_email",
      type: "email",
      placeholder: "Email",
      img: { MailIcon },
      required: "Veuillez entrer une adresse email",
    },
    {
      name: "orderqrcode_firstName",
      type: "text",
      placeholder: "Prénom",
      img: { UserIcon },
      required: "Veuillez entrer votre prénom",
    },
    {
      name: "orderqrcode_lastName",
      type: "text",
      placeholder: "Nom",
      img: { UserIcon },
      required: "Veuillez entrer votre nom",
    },
    {
      name: "orderqrcode_phone",
      type: "phone",
      required: "Veuillez entrer un numéro de téléphone",
    },
    {
      name: "orderqrcode_street",
      type: "text",
      placeholder: "Nom et numéro de rue",
      img: { UserIcon },
      required: "Veuillez entrer un nom et numéro de rue valide",
    },
    {
      name: "orderqrcode_appartment",
      type: "text",
      placeholder: "Numéro étage/Appartement(Optionnel)",
      img: { UserIcon },
    },
    {
      name: "orderqrcode_postalCode",
      type: "text",
      placeholder: "Code postale",
      img: { UserIcon },
      required: "Veuillez entrer un code postale",
    },
  ];
}

export function validatePhoneForm(phone) {
  return [
    {
      name: "chooseVerifMethode_phoneNumber",
      type: "number",
      placeholder: phone.phone,
    },
  ];
}

export function addStaffForm() {
  return [
    {
      name: "addStaff_email",
      type: "email",
      placeholder: "Email",
      img: { MailIcon },
      required: "Veuillez entrer une adresse email",
    },
  ];
}
