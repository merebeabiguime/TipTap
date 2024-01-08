import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function CustomPopup(props) {
  const [showPopup, setShowPopup] = useState(true);
  const { title, description } = props;
  return (
    <div>
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
