import React from "react";
import { Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const MedicineCard = ({ medicineName, dosage, frequency, duration, onClose, quantity }) => {
  return (
    <Card
      title={medicineName}
      bordered={true}
      style={{ width: "auto", height: "auto" }}
      extra={<Button type="text" icon={<CloseOutlined />} onClick={onClose} />}
    >
      <p>
        <b>Dosage:</b> {dosage}
      </p>
      <p>
        <b>Frequency:</b> {frequency}
      </p>
      <p>
        <b>Duration:</b> {duration}
      </p>
      <p>
        <b>Quantity:</b> {quantity}
      </p>
    </Card>
  );
};

export default MedicineCard;
