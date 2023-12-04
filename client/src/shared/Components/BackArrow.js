import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const BackArrow = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <button onClick={goBack} style={{ border: "none", background: "none", cursor: "pointer" }}>
      <LeftOutlined /> Back
    </button>
  );
};

export default BackArrow;
