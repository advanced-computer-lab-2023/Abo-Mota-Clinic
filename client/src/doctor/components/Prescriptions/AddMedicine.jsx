import React, { useState } from "react";
import { useAddMedToPrescriptionMutation, useGetAllMedicinesQuery } from "../../../store";
import LoadingIndicator from "../../../shared/Components/LoadingIndicator";
import Button from "../../../shared/Components/Button";
import { TextField } from "@mui/material";
import { Box, Modal, Option, Select, Typography } from "@mui/joy";

function AddMedicine({ prescriptionId }) {
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetAllMedicinesQuery();
  const [addMedInPres, results] = useAddMedToPrescriptionMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [medicineData, setMedicineData] = useState({
    medicineName: "",
    medicineId: "",
    dosage: 0,
    frequency: "",
    duration: "",
  });
  if (isFetching) {
    return <LoadingIndicator />;
  }
  const handleSelectChange = (event, newValue) => {
    // console.log(newValue);
    if (newValue === null) {
      return;
    }
    setMedicineData({
      ...medicineData,
      medicineName: newValue,
      medicineId: data.find((medicine) => medicine.name === newValue)._id,
    });
  };
  const handleInputChange = (event) => {
    // console.log(event);
    event.preventDefault();
    const { name, value } = event.target;
    setMedicineData({
      ...medicineData,
      [name.toLowerCase()]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      medicineData.medicineName === "" ||
      medicineData.dosage === 0 ||
      medicineData.frequency === "" ||
      medicineData.duration === ""
    ) {
      return;
    }
    console.log(medicineData);
    await addMedInPres({ ...medicineData, prescriptionId, dosage: parseInt(medicineData.dosage) });
    setMedicineData({
      medicineName: "",
      medicineId: "",
      dosage: 0,
      frequency: "",
      duration: "",
    });
    handleClose();

    // Submit the form data
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "99vh", // Set a maximum height
    overflowY: "auto", // Enable vertical scrolling
    bgcolor: "white",
    boxShadow: 24,
    width: 600,
    p: 4,
  };
  return (
    <Box className="w-full flex justify-end">
      <Button onClick={handleOpen}>Add Medicine</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="prescription-modal-title">
        <Box sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 2 }}></Box>
            <Box>
              <Typography id="prescription-modal-title" variant="h6" component="h2">
                Add Medicine
              </Typography>
              <Box>
                <Select
                  placeholder="Select Medicine"
                  value={medicineData.medicineName}
                  onChange={handleSelectChange}
                  sx={{ mb: 2 }}
                >
                  {data.map((medicine, idx) => {
                    return (
                      <Option key={idx} value={medicine.name}>
                        {medicine.name}
                      </Option>
                    );
                  })}
                </Select>
                <TextField
                  label="Dosage"
                  name="dosage"
                  value={medicineData.dosage}
                  onChange={handleInputChange}
                  sx={{ mb: 2, width: "100%" }}
                />
                <TextField
                  label="Frequency"
                  name="Frequency"
                  value={medicineData.frequency}
                  onChange={handleInputChange}
                  sx={{ mb: 2, width: "100%" }}
                />
                <TextField
                  label="Duration"
                  name="Duration"
                  value={medicineData.duration}
                  onChange={handleInputChange}
                  sx={{ mb: 2, width: "100%" }}
                />
              </Box>
            </Box>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default AddMedicine;
