import React from "react";

export default function TitleSubtitle(props) {
  const { title, subTitle } = props;
  return (
    <div>
      <h1 style={{ marginTop: "50px" }}>{title ? title : ""}</h1>
      <p style={{ marginTop: "10px" }}>{subTitle ? subTitle : ""}</p>
    </div>
  );
}
