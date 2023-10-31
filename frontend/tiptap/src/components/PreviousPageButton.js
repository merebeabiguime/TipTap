import React from "react";
import { useNavigate } from "react-router-dom";

import previousIcon from "../images/previous_icon.png"; // Importez votre icône ici

export default function PreviousPageButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Naviguer à la page précédente
  };

  return (
    <div>
      <button className="btn " onClick={handleGoBack}>
        <img src={previousIcon} alt="Custom Icon" className="mr-2" />
      </button>
    </div>
  );
}
