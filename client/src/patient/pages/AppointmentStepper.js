import { Fragment, useState } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { Button, Card, CardContent, Typography, Divider, AspectRatio } from "@mui/joy";
import DoctorImg from "../assets/images/doctor.jpg";

import AppointmentScheduler from "./AppointmentScheduler";
import PaymentPage from "./PaymentPage";
import Toast from "../components/Toast";

import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoadingIndicator from "../../shared/Components/LoadingIndicator";

import { LuStethoscope, LuCalendarClock, LuBuilding } from "react-icons/lu";

// QUERIES
import {
  useFetchDoctorsQuery,
  useFetchPatientQuery,
  usePayAppointmentByWalletMutation,
  useCreditDoctorMutation,
  useBookAppointmentMutation,
} from "../../store";
import round2dp from "../utils/round2dp";
import dayjs from "dayjs";

const steps = ["Schedule", "Appointment Overview", "Payment"];
const format = (date) => (date ? dayjs(date).format("dddd Do [of] MMMM YYYY") : null);

export default function AppointmentStepper({ step = 0, socket }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { initialDate, initialTime, initialAppointmentId, initialTimings } = location.state
    ? location.state
    : { initialDate: null, initialTime: null, initialAppointmentId: null, initialTimings: [] };
  const [activeStep, setActiveStep] = useState(step);
  const { doctorId, id } = useParams();
  console.log(dayjs(initialDate, { format: "MM/DD/YYYY" }));
  const [date, setDate] = useState(format(initialDate));
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [appointmentId, setAppointmentId] = useState(initialAppointmentId);
  const [currentTimings, setCurrentTimings] = useState(initialTimings);
  const [selectedUser, setSelectedUser] = useState(-1);

  const {
    data: doctors,
    isFetching: isFetchingDoctor,
    error: isFetchingDoctorError,
  } = useFetchDoctorsQuery();

  const {
    data: patient,
    isFetching: isFetchingPatient,
    error: isFetchingPatientError,
  } = useFetchPatientQuery();

  const [creditDoctor, creditDoctorResults] = useCreditDoctorMutation();
  const [bookAppointment, bookResults] = useBookAppointmentMutation();

  const [toast, setToast] = useState({
    open: false,
    duration: 4000,
  });

  const onToastClose = (event, reason) => {
    if (reason === "clickaway") return;

    setToast({
      ...toast,
      open: false,
    });
  };

  if (isFetchingDoctor || isFetchingPatient) {
    return <div>Loading ...</div>;
  } else if (isFetchingDoctorError || isFetchingPatientError) {
    return <div> Error ... </div>;
  }
  const { name, specialty, affiliation, rate } = doctors[id];
  const deductible = !(
    patient.healthPackage.package === null || patient.healthPackage.package === undefined
  )
    ? rate * 1.1 * (1 - patient.healthPackage.package.doctorDiscount)
    : rate * 1.1;

  const handleNext = () => {
    if (activeStep === 0 && !(date && currentTime)) return;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setDate(null);
    setAppointmentId(null);
    setCurrentTime(null);
    setCurrentTimings([]);
    setActiveStep(0);
  };

  const scheduling = (
    <AppointmentScheduler
      currentTimings={currentTimings}
      setCurrentTimings={setCurrentTimings}
      date={date}
      setDate={setDate}
      currentTime={currentTime}
      setCurrentTime={setCurrentTime}
      doctorId={doctorId}
      appointmentId={appointmentId}
      setAppointmentId={setAppointmentId}
    />
  );

  const config = {
    items: [
      {
        label: "Consultation Fee",
        price: round2dp(rate * 1.1),
      },
    ],

    discount: !(
      patient.healthPackage.package === null || patient.healthPackage.package === undefined
    )
      ? patient.healthPackage?.package?.doctorDiscount
      : 0,

    type: "appointment",

    details: {
      date,
      currentTime,
      location: affiliation,
    },

    usersState: {
      selectedUser,
      setSelectedUser,
    },

    isSubscribing: false,

    onPaymentSuccess: () => {
      creditDoctor({
        doctor_id: doctorId,
        credit: rate,
      });

      bookAppointment({
        appointmentId,
        username: selectedUser.username,
        price: deductible,
      });

      setToast({
        ...toast,
        open: true,
        color: "success",
        message: "Payment completed successfully!",
      });

      setTimeout(() => {
        navigate("/patient/");
      }, 1500);
    },

    onPaymentFailure: () => {
      setToast({
        ...toast,
        open: true,
        color: "danger",
        message: "Payment unsuccessful",
      });
    },
  };
  
  const payment = <PaymentPage {...config} socket={socket} />;

  const review = (
    <Box className="flex justify-between px-10">
      <Card className="">
        <Box className="flex w-full justify-center"></Box>
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
              <Typography level="title-sm">Dr. {name}</Typography>
            </Box>

            <Box className="flex space-x-5">
              <Typography level="body-sm" sx={{ width: 90 }}>
                Specialty
              </Typography>
              <Typography level="title-sm">{specialty}</Typography>
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
              <Typography level="title-sm">{date}</Typography>
            </Box>

            <Box className="flex space-x-5">
              <Typography level="body-sm" sx={{ width: 90 }}>
                Time
              </Typography>
              <Typography level="title-sm">{currentTime}</Typography>
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
            <Typography level="title-sm">{affiliation}</Typography>
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
            <Typography level="body-sm">${rate}</Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box className="flex justify-between">
            <Typography level="body-sm">Subtotal</Typography>
            <Typography level="body-sm">${rate}</Typography>
          </Box>
          <Box className="flex justify-between">
            <Typography level="body-sm">Discount</Typography>
            <Typography level="body-sm" color="success">
              {" "}
              - $({rate - deductible})
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box className="flex justify-between">
            <Typography level="title-md">Total</Typography>
            <Typography level="title-md">${deductible}</Typography>
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
    <Box sx={{ my: 5, mx: 5, width: "100%", py: 5, px: 20 }} className="">
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
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
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
        </Fragment>
      )}

      <Toast {...toast} onClose={onToastClose} />
    </Box>
  );
}
