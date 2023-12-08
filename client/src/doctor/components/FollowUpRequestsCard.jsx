import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import { BiCalendarX } from "react-icons/bi";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/joy/Chip";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import TwoButtonModal from "../../shared/Components/TwoButtonModal";
import { useState } from "react";
import { useHandleFollowUpMutation } from "../../store";
export default function FollowUpRequestsCard({ followUpRequest }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [handleFollowUp, results] = useHandleFollowUpMutation();
  const currDate = dayjs();
  const followUpRequestDate = dayjs(followUpRequest.formattedDate);

  const handleShowModal = () => setShowCancelModal(true);
  const handleCloseModal = () => setShowCancelModal(false);
  const handleCancelRequest = async () => {
    console.log("Rejected");
    const handleRequest = {
      followUpId: followUpRequest._id,
      choice: "revoke",
    };
    console.log(handleRequest);
    await handleFollowUp(handleRequest);
    setShowCancelModal(false);
  };
  const handleAcceptRequest = async () => {
    console.log("Accepted");
    const handleRequest = {
      followUpId: followUpRequest._id,
      choice: "accept",
    };
    console.log(handleRequest);
    await handleFollowUp(handleRequest);
  };
  const message = "Are you sure you want to reject the follow up request?";

  return (
    <Box sx={{ width: "100%", marginBottom: "16px" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row", // Align children horizontally
          justifyContent: "space-between", // Distribute space between image and content
          overflow: "hidden",
          boxShadow: "md", // Shadow for the card
          borderRadius: "sm", // Border radius of the card
        }}
        className="hover:shadow-lg" // Tailwind CSS for hover shadow effect
      >
        <AspectRatio ratio="0.8" sx={{ minWidth: 150 }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column", // Stack children vertically inside card content
            justifyContent: "space-between", // Space between card content children
            flexGrow: 1, // card content will grow to fill container
            minWidth: 0, // Fixes flexbox overflow issues with text
          }}
        >
          <Box className="flex flex-row justify-between mb-2">
            <Typography level="h3" fontWeight="lg">
              {capitalizeFirstLetter(followUpRequest.patient.name)}
            </Typography>
            <Chip color="neutral" variant="soft">
              <Typography level="title-md">{capitalizeFirstLetter("Follow Up")}</Typography>
            </Chip>
          </Box>

          <Divider />

          <Box className="flex flex-col space-y-2 mt-3">
            <Box className="flex space-x-3">
              <Typography
                level="body-md"
                textColor="text.tertiary"
                startDecorator={<AccessTimeIcon fontSize="small" />}
              >
                {dayjs(followUpRequest.oldDate).format("MM/DD/YYYY hh:mm A")}
              </Typography>
              <Chip color="danger" variant="soft">
                <Typography>old date</Typography>
              </Chip>
            </Box>

            <Box className="flex space-x-3">
              <Typography
                level="body-md"
                textColor="text.tertiary"
                startDecorator={<AccessTimeIcon fontSize="small" />}
              >
                {dayjs(followUpRequest.date).format("MM/DD/YYYY hh:mm A")}
              </Typography>
              <Chip color="success" variant="soft">
                <Typography>new date</Typography>
              </Chip>
            </Box>
            <Typography
              level="body-md"
              textColor="text.tertiary"
              startDecorator={<MarkunreadIcon fontSize="small" />}
            >
              {followUpRequest.patient.email}
            </Typography>
            <div className="flex justify-between">
              <Typography
                level="body-md"
                textColor="text.tertiary"
                startDecorator={<PhoneIcon fontSize="small" />}
              >
                {followUpRequest.patient.mobile}
              </Typography>
              <Box className="space-x-2" sx={{ display: "flex", alignItems: "center" }}>
                <Button onClick={handleAcceptRequest}>Accept</Button>
                <Button onClick={handleShowModal}>Reject</Button>
              </Box>
            </div>
          </Box>
        </CardContent>
      </Card>
      <TwoButtonModal
        open={showCancelModal}
        handleClose={handleCloseModal}
        handleClickLogic={handleCancelRequest}
        message={message}
      />
    </Box>
  );
}

function capitalizeFirstLetter(string) {
  // Check if the string is empty or null
  if (!string) {
    return string;
  }
  let name = string.split(" ");
  let result = "";

  for (let i = 0; i < name.length; i++) {
    const string = name[i].charAt(0).toUpperCase() + name[i].slice(1);
    result = result + " " + string;
  }

  // Capitalize the first letter and concatenate it with the rest of the string
  return result;
}

export { capitalizeFirstLetter };
