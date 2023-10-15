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
import doctorPic from "../../shared/assets/doctor-pic.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function ApplicationCard({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAccept = () => {
    // Handle the accept action here
  };

  const handleReject = () => {
    // Handle the reject action here
  };

  return (
    <Card sx={cardStyles}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            U
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
