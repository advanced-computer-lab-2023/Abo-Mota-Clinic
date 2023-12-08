import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
// import { Button } from "@mui/joy";
import Button from "./Button";
const BackArrow = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <Button
      onClick={goBack}
      // sx={{
      //   border: "none",
      //   background: "none",
      //   color: "black",
      //   cursor: "pointer",
      //   "&:hover": { backgroundColor: "#1890ff" },
      // }}
    >
      <LeftOutlined /> Back
    </Button>
  );
};

export default BackArrow;
