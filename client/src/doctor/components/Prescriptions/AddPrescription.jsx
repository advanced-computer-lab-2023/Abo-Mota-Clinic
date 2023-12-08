import { Box, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import Button from "../../../shared/Components/Button";
import { FormControl, MenuItem, Modal, Option, Select, Typography } from "@mui/joy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MedicineCard from "./MedicineCard";
import { useGetAllMedicinesQuery } from "../../../store";
import LoadingIndicator from "../../../shared/Components/LoadingIndicator";

function AddPrescription({ doctorId, patientId }) {
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetAllMedicinesQuery();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [prescription, setPrescription] = useState({
    date: new Date(),
    doctor: doctorId,
    medicines: [],
    description: "",
    patient: patientId,
    status: "unfilled",
  });

  //{ medicine: "", dosage: "", frequency: "", duration: "" }
  const [medicineData, setMedicineData] = useState({
    // medicineName: "",
    medicine: "",
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
      // medicineName: newValue,
      medicine: data.find((medicine) => medicine.name === newValue)._id,
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

  const addMedicine = (event) => {
    event.preventDefault();
    if (
      medicineData.medicineName === "" ||
      medicineData.dosage === 0 ||
      medicineData.frequency === "" ||
      medicineData.duration === ""
    ) {
      return;
    }
    console.log(medicineData);
    setPrescription({
      ...prescription,
      medicines: [...prescription.medicines, medicineData],
    });
    setMedicineData({
      // medicineName: "",
      medicine: "",
      dosage: 0,
      frequency: "",
      duration: "",
    });
  };

  const handleDescriptionChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setPrescription({
      ...prescription,
      description: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    console.log(prescription);
    setPrescription({
      date: new Date(),
      doctor: doctorId,
      medicines: [],
      description: "",
      patient: patientId,
      status: "unfilled",
    });
    // Submit the form data
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "99vh", // Set a maximum height
    overflowY: "auto", // Enable vertical scrolling
    bgcolor: "background.paper",
    boxShadow: 24,
    width: 600,
    p: 4,
  };

  //   console.log(data);
  return (
    <div>
      <Button startIcon={<AddCircleOutlineIcon />} onClick={handleOpen}>
        Add Prescription
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="prescription-modal-title">
        <Box sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 2 }}>
              <Typography id="prescription-modal-title" variant="h6" component="h2">
                Added Medicines
              </Typography>

              {prescription.medicines.length === 0 ? (
                <p>No medicines added</p>
              ) : (
                prescription.medicines.map((medicine, index) => {
                  return (
                    <MedicineCard
                      key={index}
                      medicineName={medicine.medicineName}
                      dosage={medicine.dosage}
                      frequency={medicine.frequency}
                      duration={medicine.duration}
                      onClose={() => {
                        setPrescription({
                          ...prescription,
                          medicines: prescription.medicines.filter(
                            (med) => med.medicineName !== medicine.medicineName
                          ),
                        });
                      }}
                    />
                  );
                })
              )}
            </Box>
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
              <Button onClick={addMedicine}>Add Medicine</Button>
              <TextField
                label="Description"
                name="description"
                value={prescription.description}
                onChange={handleDescriptionChange}
                sx={{ mb: 2, width: "100%" }}
                multiline
                rows={4}
              />
            </Box>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddPrescription;
