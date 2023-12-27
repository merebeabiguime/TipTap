import React from "react";
import { useNavigate } from "react-router-dom";

import previousIcon from "../images/previous_icon.png"; // Importez votre icône ici
import { Row } from "react-bootstrap";

export default function PreviousPageButton(props) {
  const navigate = useNavigate();
  const { title } = props;

  const handleGoBack = () => {
    navigate(-1); // Naviguer à la page précédente
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <Row>
        <div className="col-12  ">
          <button
            className="btn "
            style={{ position: "absolute", top: "35px" }}
            onClick={handleGoBack}
          >
            <img src={previousIcon} alt="Custom Icon" className="mr-2" />
          </button>
          <h6 className="text-center" style={{ paddingLeft: "40px" }}>
            {title ? title.title : ""}
          </h6>
        </div>
      </Row>
    </div>
  );
}
