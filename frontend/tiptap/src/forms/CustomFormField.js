import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "../style.css";

export default function CustomFormField(props) {
  const { imgSrc, placeholder, type, onChange, defaultValue } = props;
  var defauLtValueString = null;
  if (typeof defaultValue === "object" && defaultValue !== null) {
    defauLtValueString = Object.values(defaultValue)[0];
  } else {
    defauLtValueString = defaultValue;
  }
  console.log("imgSrc", onChange);
  return (
    <div>
      <InputGroup className="inputGroup d-flex align-items-center ">
        {imgSrc && (
          <img src={Object.values(imgSrc)[0]} alt="Img" className="iconForm " />
        )}

        <Form.Control
          type={type}
          placeholder={placeholder ? placeholder : ""}
          className="customForm "
          onChange={onChange}
          value={defauLtValueString && defauLtValueString}
        />
      </InputGroup>
    </div>
  );
}
