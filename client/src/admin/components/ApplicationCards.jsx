import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import doctorPic from "../../shared/assets/woman-doctor.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useHandleApplicationMutation } from "../../store";

const expandButtonStyles = {
  marginLeft: "auto",
};

const cardStyles = {
  maxWidth: 345,
  margin: "10px", // Add some margin to the card
  padding: "10px", // Add some padding to the card
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", // Add a shadow effect
};

const infoStyles = {
  fontSize: "16px",
  margin: "8px 0",
  color: "rgba(0, 0, 0, 0.87)", // Adjust the color to your preference
  // textTransform: "capitalize", // Capitalize the text
};

const infoContainerStyles = {
  borderTop: "1px solid #ccc", // Add a top border
  paddingTop: "10px",
  marginTop: "10px",
};

const linkStyles = {
  textDecoration: "underline",
  cursor: "pointer",
  color: "blue",
};

const actionContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const handleViewFile = (file) => {
  const arrayBuffer = new Uint8Array(file.data.data).buffer;
  const blob = new Blob([arrayBuffer], { type: file.contentType });
  const fileUrl = URL.createObjectURL(blob);
  window.open(fileUrl, "_blank");
};
const ViewFile = ({ name, file }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <span className="text-sm font-medium">{name}</span>
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:underline" onClick={() => handleViewFile(file)}>
          View
        </button>
      </div>
    </div>
  );
};
export default function ApplicationCard({ data }) {
  const [expanded, setExpanded] = React.useState(false);
  // console.log(data);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [handleApplication, results] = useHandleApplicationMutation();
  const handleAccept = async () => {
    await handleApplication({ id: data._id, registrationStatus: "approved" });
    // console.log(data._id);
    // console.log(results);
  };

  const handleReject = async () => {
    // Handle the reject action here
    await handleApplication({ id: data._id, registrationStatus: "rejected" });
    // console.log(results);
  };

  return (
    <Card sx={cardStyles}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data.name[0]}
          </Avatar>
        }
        title={data.email}
      />
      <CardMedia component="img" height="194" image={doctorPic} alt="Doctor" />
      <CardContent>
        <Typography variant="h6" color="text.primary" fontWeight="bold" fontFamily="Helvetica Neue">
          Dr. {data.name}
        </Typography>
        <Typography variant="body" color="text.secondary" fontStyle="italic">
          specializes in {data.speciality} at {data.affiliation}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="show more" onClick={handleExpandClick} sx={expandButtonStyles}>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={infoContainerStyles}>
            <Typography sx={infoStyles}>Username: {data.username}</Typography>
            {/* <Typography sx={infoStyles}>Password: {data.password}</Typography> */}
            <Typography sx={infoStyles}>Date of Birth: {data.formattedDob}</Typography>
            <Typography sx={infoStyles}>Hourly Rate: ${data.rate}/hr</Typography>
            <Typography sx={infoStyles}>Education: {data.educationalBackground}</Typography>
            <Typography sx={infoStyles}>Files: </Typography>
            {data.medicalLicense && <ViewFile name="Medical License" file={data.medicalLicense} />}
            {data.medicalDegree && <ViewFile name="Medical Degree" file={data.medicalDegree} />}
            {data.nationalId && <ViewFile name="National Id" file={data.nationalId} />}
          </div>
          {/* <div style={infoContainerStyles}>
            <Typography sx={infoStyles}>
              Medical License: <Link to={data.medicalLicense.contentType} style={linkStyles}>View License</Link>
            </Typography>
            <Typography sx={infoStyles}>
              Medical Degree: <Link to={data.medicalDegree.contentType} style={linkStyles}>View Degree</Link>
            </Typography>
          </div> */}
          <br />
          <div style={actionContainerStyles}>
            <Button onClick={handleAccept} variant="outlined" color="success">
              Accept
            </Button>
            <Button onClick={handleReject} variant="outlined" color="error">
              Reject
            </Button>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
