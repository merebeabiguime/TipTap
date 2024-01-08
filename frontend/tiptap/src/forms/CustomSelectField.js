import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "../style.css";

export default function CustomSelectField(props) {
  const { onChange, childrens, value } = props;

  console.log("les children", childrens);

  return (
    <div>
      <InputGroup className="inputGroup d-flex align-items-center ">
        <Form.Select onChange={onChange} value={value} className="customForm">
          {childrens &&
            childrens.selectQuantity.map((input) => (
              <option value={input.value}>{input.description}</option>
            ))}
        </Form.Select>
      </InputGroup>
    </div>
  );
}
