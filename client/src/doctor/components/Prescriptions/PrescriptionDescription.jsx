import { Box, Typography } from "@mui/joy";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../../shared/Components/Button";
import { useUpdateDescriptionMutation } from "../../../store";
import { Tooltip } from "antd";

function PrescriptionDescription({ prescriptionId, description }) {
  const [editDescription, setEditDescription] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [updateDescription, _] = useUpdateDescriptionMutation();
  const handleEditDescription = () => {
    setEditDescription(!editDescription);
  };
  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };
  const handleDescriptionSave = async (event) => {
    event.preventDefault();
    const newDescription = {
      description: descriptionValue,
      prescriptionId,
    };
    await updateDescription(newDescription);
    console.log(newDescription);
    setEditDescription(false);
    setDescriptionValue(descriptionValue);
  };
  return (
    <>
      {editDescription ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            mt: 1,
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Description"
            name="Description"
            value={descriptionValue}
            onChange={handleDescriptionChange}
            sx={{ mb: 2, width: "100%", mr: 2 }}
            multiline
          />
          <Button onClick={handleDescriptionSave}>Change</Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            mt: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
            {descriptionValue}
          </Typography>
          <Tooltip placement="top" title="Edit description">
            <EditIcon
              sx={{ cursor: "pointer", fontSize: 20, ":hover": { fontSize: 25 } }}
              onClick={handleEditDescription}
            />
          </Tooltip>
        </Box>
      )}
    </>
  );
}

export default PrescriptionDescription;
