import React from "react";
import { useNavigate } from "react-router-dom";
import TitleSubtitle from "../components/reusable/TitleSubtitle";
import previousIcon from "../images/previous_icon.png"; // Import your icon here

export default function PreviousPageButton(props) {
  const navigate = useNavigate();
  const { firstTitle, secondTitle, subTitle } = props;

  const handleGoBack = () => {
    navigate(-2); // Navigate to the previous page
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "75px",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <img src={previousIcon} alt="Custom Icon" onClick={handleGoBack} />
        </div>
        <div
          style={{ textAlign: "center", paddingRight: "20px" }}
          className="text-center mx-auto d-flex"
        >
          <h6>{firstTitle ? firstTitle : ""}</h6>
        </div>
      </div>
      <div>
        <TitleSubtitle
          title={secondTitle ? secondTitle : ""}
          subTitle={subTitle ? subTitle : ""}
        />
      </div>
    </div>
  );
}
