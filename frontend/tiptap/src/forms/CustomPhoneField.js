import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the library styles
import "../style.css";

export default function CustomPhoneField(props) {
  const { value, onChange, placeholder } = props;

  return (
    <div style={{ marginBottom: "25px" }}>
      <PhoneInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputClass="customPhoneField"
        country={"fr"}
      />
    </div>
  );
}
