import { AspectRatio, Box, Typography, ListItem } from "@mui/joy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { TextField } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  useDelMedFromPrescriptionMutation,
  useUpdateMedInPrescriptionMutation,
} from "../../../store";
const MedicationListItem = ({
  medicine: { name, _id },
  dosage,
  frequency,
  duration,
  prescriptionId,
}) => {
  const [editPres, setEditPres] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    prescriptionId,
    name,
    dosage,
    frequency,
    duration,
  });
  // const [newDosage, setNewDosage] = useState(dosage);
  // const [newFrequency, setNewFrequency] = useState(frequency);
  // const [newDuration, setNewDuration] = useState(duration);
  const [delMedinPres, results1] = useDelMedFromPrescriptionMutation();
  const handleDeleteMedicine = async () => {
    await delMedinPres({ prescriptionId, medicineName: name });
    console.log("delete medicine");
  };

  const [updateMedinPres, results2] = useUpdateMedInPrescriptionMutation();
  const handleEditMedicine = () => {
    setEditPres(true);
    // prescriptionId,medicineName
    console.log("edit medicine");
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    setNewMedicine({
      ...newMedicine,
      [name.toLowerCase()]: value,
    });
    // setNewDosage(value);
    console.log(value);
  };

  const handleCorrectUpdate = async () => {
    // add new dosage to database
    setEditPres(false);

    await updateMedinPres({ ...newMedicine, dosage: parseInt(newMedicine.dosage) });
    // setNewDosage(newDosage);
    console.log(newMedicine);
    console.log("correct dosage");
  };

  const handleCancelUpdate = () => {
    setEditPres(false);
    // setNewDosage(dosage);
    setNewMedicine({
      prescriptionId,
      medicineId: _id,
      name,
      dosage,
      frequency,
      duration,
    });
    console.log("cancel dosage");
  };

  return (
    <ListItem sx={{ margin: "5px" }}>
      {/* <AspectRatio ratio="0.6" sx={{ width: 30, marginLeft: 1, marginRight: 1.5 }}>
        <img
          // srcSet={`https://images-cdn.ubuy.co.in/633a9ef26d3a8040c23715a8-centrum-multivitamin-for-men.jpg?w=120&fit=crop&auto=format&dpr=2 2x`}
          // src={`https://images-cdn.ubuy.co.in/633a9ef26d3a8040c23715a8-centrum-multivitamin-for-men.jpg?w=120&fit=crop&auto=format`}
          alt={name}
        />
      </AspectRatio> */}
      <Box className="flex justify-between w-full">
        <Box className="mr-6">
          <Typography level="body-xs">Drug</Typography>
          <Typography level="title-sm" fontWeight="md">
            {name}
          </Typography>
        </Box>
        <Box className="justify-items-end">
          <Typography level="body-xs">Dosage</Typography>
          {editPres ? (
            <TextField
              value={newMedicine.dosage}
              id="outlined-basic"
              label="Dosage"
              name="dosage"
              variant="outlined"
              size="small"
              sx={{ width: "30%", mt: 1 }}
              onChange={handleInputChange}
            />
          ) : (
            <Typography level="title-sm">{newMedicine.dosage}</Typography>
          )}
        </Box>
        <Box className="justify-items-end">
          <Typography level="body-xs">Frequency</Typography>
          {editPres ? (
            <TextField
              value={newMedicine.frequency}
              id="outlined-basic"
              label="Frequency"
              variant="outlined"
              name="frequency"
              size="small"
              sx={{ width: "30%", mt: 1 }}
              onChange={handleInputChange}
            />
          ) : (
            <Typography level="title-sm">{newMedicine.frequency}</Typography>
          )}
        </Box>
        <Box className="justify-items-end">
          <Typography level="body-xs">Duration</Typography>
          {editPres ? (
            <TextField
              value={newMedicine.duration}
              id="outlined-basic"
              label="Duration"
              name="duration"
              variant="outlined"
              sx={{ width: "30%", mt: 1 }}
              onChange={handleInputChange}
            />
          ) : (
            <Typography level="title-sm">{newMedicine.duration}</Typography>
          )}
        </Box>
        {/* <Button onClick={handleDeleteMedicine}> */}
        {editPres ? (
          <CancelOutlinedIcon
            sx={{ cursor: "pointer", fontSize: 20, ":hover": { fontSize: 25 } }}
            onClick={handleCancelUpdate}
          />
        ) : (
          <DeleteForeverIcon
            sx={{ cursor: "pointer", ":hover": { fontSize: 25 } }}
            onClick={handleDeleteMedicine}
          />
        )}
        {editPres ? (
          <CheckOutlinedIcon
            sx={{ cursor: "pointer", fontSize: 20, ":hover": { fontSize: 25 } }}
            onClick={handleCorrectUpdate}
          />
        ) : (
          <EditIcon
            sx={{ cursor: "pointer", fontSize: 20, ":hover": { fontSize: 25 } }}
            onClick={handleEditMedicine}
          />
        )}

        {/* </Button> */}
      </Box>
    </ListItem>
  );
};

export default MedicationListItem;
