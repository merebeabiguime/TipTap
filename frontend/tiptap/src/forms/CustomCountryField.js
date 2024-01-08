import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "../style.css";
import { CountryDropdown } from "react-country-region-selector";

export default function CustomCountryField(props) {
  const { onChange, value } = props;

  return (
    <div>
      <CountryDropdown
        value={value}
        onChange={onChange}
        classes="customForm"
        placeholder="Pays"
      />
    </div>
  );
}
