import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/joy/Divider";
import DoctorImg from "../assets/images/doctor.jpg";

import { LuStethoscope, LuCalendarClock, LuBuilding } from "react-icons/lu";

import PatientTest from "./PatientTest";
import { AspectRatio, CardContent } from "@mui/joy";
import PaymentPage from "./PaymentPage";
import { useParams } from "react-router-dom";

const steps = ["Schedule", "Appointment Overview", "Payment"];

export default function PatientTest2({ step = 0 }) {
  const [activeStep, setActiveStep] = React.useState(step);
  const { doctorId } = useParams();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const scheduling = <PatientTest doctorId={doctorId} />;
  const payment = <PaymentPage />;

  const fn = (header, info) => {
    return (
      <Box>
        <Typography level="body-xs">{header}</Typography>
        <Typography level="title-md">{info}</Typography>
      </Box>
    );
  };

  const review = (
    <Box className="flex justify-between px-10">
      <Card className="">
        <Box className="flex w-full justify-center">
          {/* <AspectRatio
            className="flex"
            ratio="1"
            sx={{
              width: 100,
              borderRadius: '100%',
              bgcolor: 'background.level2',
              // borderRadius: 'md',
            }}>
            <img
              src={DoctorImg}
              loading="lazy"
              alt="Doctor"
            />
          </AspectRatio> */}
        </Box>
        <Box>
          <Typography level="title-md" sx={{ marginBottom: 1 }} startDecorator={<LuStethoscope />}>
            Doctor Details
          </Typography>

          <Divider sx={{ marginBottom: 1 }} />

          <Box className="space-y-1 mb-10">
            <Box className="flex space-x-5">
              <Typography level="body-sm" sx={{ width: 90 }}>
                Name
              </Typography>
              <Typography level="title-sm">Dr. Jane Smith</Typography>
            </Box>

            <Box className="flex space-x-5">
              <Typography level="body-sm" sx={{ width: 90 }}>
                Specialty
              </Typography>
              <Typography level="title-sm">Orthopedics</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography
            level="title-md"
            sx={{ marginBottom: 1 }}
            startDecorator={<LuCalendarClock />}
          >
            Date & Time
          </Typography>

          <Divider sx={{ marginBottom: 1 }} />

          <Box className="space-y-1 mb-10">
            <Box className="flex space-x-5">
              <Typography level="body-sm" sx={{ width: 90 }}>
                Date
              </Typography>
              <Typography level="title-sm">Jun 21, 2021</Typography>
            </Box>

            <Box className="flex space-x-5">
              <Typography level="body-sm" sx={{ width: 90 }}>
                Time
              </Typography>
              <Typography level="title-sm">11:00 AM</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography level="title-md" sx={{ marginBottom: 1 }} startDecorator={<LuBuilding />}>
            Location
          </Typography>

          <Divider sx={{ marginBottom: 1 }} />

          <Box className="flex space-x-5">
            <Typography level="body-sm" sx={{ width: 90 }}>
              Location
            </Typography>
            <Typography level="title-sm">Grey Sloan Hospital</Typography>
          </Box>

          {/* <fn header="Location" info="Grey Sloan Memorial Hospital" /> */}
        </Box>
      </Card>

      <Divider orientation="vertical" />

      <Card className="" sx={{ width: "30%" }}>
        <Typography level="title-md">Payment Summary</Typography>

        <Divider />
        <Box>
          <Box className="flex justify-between">
            <Typography level="body-sm">Consultation</Typography>
            <Typography level="body-sm">$30</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box className="flex justify-between">
            <Typography level="body-sm">Subtotal</Typography>
            <Typography level="body-sm">$30</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography level="body-sm">Discount</Typography>
            <Typography level="body-sm" color="success">
              {" "}
              - ($5)
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box className="flex justify-between">
            <Typography level="title-md">Total</Typography>
            <Typography level="title-md">$25</Typography>
          </Box>

          <Box className="w-full" sx={{ marginTop: 15 }}>
            <Button className="w-full" variant="outlined">
              Proceed to Payment
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );

  const stepElements = [scheduling, review, payment];

  return (
    <Box sx={{ my: 5, mx: 5, width: "100%", p: 5 }}>
      <Stepper activeStep={activeStep} sx={{ marginBottom: 3 }}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {stepElements[activeStep]}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
