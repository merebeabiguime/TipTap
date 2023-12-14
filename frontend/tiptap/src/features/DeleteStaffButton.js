import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useFetchStaff } from "../fetches/FetchStaff";
import DeleteButton from "../images/delete_staff_button.png";

export default function DeleteStaffButton(props) {
  const { staff } = props;
  const [showPopup, setShowPopup] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState(
    "Voulez vous vraiment supprimer ce staff ?"
  );
  const fetchStaff = useFetchStaff();
  const deleteStaffMutation = useMutation({
    mutationFn: async () => await fetchStaff.deleteStaff(staff.ID),
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.status === "Success") {
        setVerificationMessage("Suppression réussie !");
        setTimeout(() => {
          // Recharge la page après 2000 millisecondes (2 secondes)
          window.location.reload();
        }, 1200);
      } else {
        setVerificationMessage(data.response);
      }
    },
  });
  return (
    <div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={showPopup}
          onHide={() => {
            setShowPopup(false);
            setVerificationMessage("Voulez vous vraiment supprimer ce staff ?");
          }}
        >
          <Modal.Body>
            <p>{verificationMessage}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPopup(false)}>
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={() => deleteStaffMutation.mutate()}
            >
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <img
        src={DeleteButton}
        alt="logo"
        className=""
        onClick={() => setShowPopup(true)}
      />
    </div>
  );
}
