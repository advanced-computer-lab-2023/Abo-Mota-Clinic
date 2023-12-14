import {
  AspectRatio,
  Card,
  Divider,
  Typography,
  Sheet,
  Button,
  CardContent,
  Tabs,
  TabList,
  TabPanel,
  Box,
  Tab,
  Breadcrumbs,
} from "@mui/joy";
import Rating from "@mui/material/Rating";
import { tabClasses } from "@mui/joy/Tab";
import DoctorImg from "../assets/images/doctor.jpg";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FormControl, FormLabel } from "@mui/material";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { getDayName, getMonthName } from "../functions/DateManipulation";
import UserSelectionModal from "./UserSelectionModal";
import { Link } from "react-router-dom";
import { useFetchAvailableAppointmentsQuery } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import formatAppointments from "../functions/AppointmentsAdjustment";
import { VideoChat } from "@mui/icons-material";
const DoctorProfile = ({ _id, name, specialty, rate, educationalBackground, affiliation }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [currentTimings, setCurrentTimings] = useState([]);
  // const [config, setConfig] = useState({});
  const [date, setDate] = useState(null);
  const { data, isFetching, error } = useFetchAvailableAppointmentsQuery(_id);
  let appointmentContent = <LoadingIndicator />;
  const navigate = useNavigate();
  if (!isFetching && !error) {
    const formattedAppointments = formatAppointments(data);
  console.log(formattedAppointments)
    const dates = Object.keys(formattedAppointments);
    // sort the array
    dates.sort((a, b) => {
      const dateA = dayjs(a, "MM/DD/YYYY");
      const dateB = dayjs(b, "MM/DD/YYYY");
      return dateA.isAfter(dateB) ? 1 : -1;
    });
    // get only the first 4 dates
    const firstFourDates = dates.slice(0, 4);
    appointmentContent = firstFourDates.map((key, rowIdx) => {
      const dateSplit = key.split("/");
      const timings = formattedAppointments[key];
      return (
        <Box>
          <Typography level="body-lg" sx={{ marginBottom: 1.5 }}>
            {`${getDayName(key)}, ${getMonthName(key)} ${dateSplit[1]}`}
          </Typography>

          <Box className="flex w-full space-x-6 mr-10">
            {timings.map(([id, appointment], colIdx) => {
              const concat = `${rowIdx}${colIdx}}`;
              return (
                <Button
                  key={colIdx}
                  onClick={() => {
                    setSelectedIdx(concat);
                    setDate(key);
                    setCurrentTime(appointment);
                    setAppointmentId(id);
                    setCurrentTimings(timings);
                  }}
                  variant={concat !== selectedIdx ? "soft" : "solid"}
                  color={concat !== selectedIdx ? "neutral" : "primary"}
                  className="h-10"
                >
                  {appointment}
                </Button>
              );
            })}
          </Box>
          {rowIdx !== Object.entries(formatAppointments).length - 1 && <Divider sx={{ my: 2.5 }} />}
        </Box>
      );
    });
  }
  // const dateFormat = "MM/DD/YYYY";
  // let filteredData = appointments2;
  // if (date != null) {
  //   filteredData = appointments2.filter(([key, value]) => {
  //     return key === date.format(dateFormat);
  //   });
  //   // console.log(filteredData);
  // }

  return (
    <Box
      className="w-full ml-20 mr-20 mt-5"
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">
          Home
        </Link>
        <Link component={RouterLink} color="neutral" to="../doctors">
          Doctors
        </Link>
        <Typography>Dr. {name}</Typography>
      </Breadcrumbs>
      <Card
        orientation="vertical"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // padding: '20px',
          // p: 5,
          // make the card resizable for demo
          overflow: "auto",
          // resize: 'vertical',
        }}
      >
        <CardContent>
          <Box name="card-header" className="flex p-5">
            <AspectRatio
              className="flex"
              ratio="1"
              sx={{
                width: 280,
                borderRadius: "100%",
                bgcolor: "background.level2",
                marginRight: 5,
                // borderRadius: 'md',
              }}
            >
              <img src={DoctorImg} loading="lazy" alt="Doctor" />
            </AspectRatio>

            <Box name="side-body" className="w-full">
              <Typography level="h1" fontWeight="lg">
                Dr. {name}
              </Typography>
              <Typography level="h4" textColor="text.tertiary" fontWeight={400}>
                {specialty}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Sheet
                sx={{
                  // bgcolor: 'background.level1',
                  borderRadius: "sm",
                  // p: 1.5,
                  my: 1.5,
                  display: "flex",
                  gap: 2,
                  "& > div": { flex: 1 },
                }}
              >
                <Box className="space-y-3">
                  <Box>
                    <Typography level="body-xs">Affiliation</Typography>
                    <Typography level="title-md">{affiliation}</Typography>
                  </Box>

                  <Box>
                    <Typography level="body-xs">Educational background</Typography>
                    <Typography level="title-md">M.D., {educationalBackground}</Typography>
                  </Box>
                </Box>

                <Box className="space-y-3">
                  <Box>
                    <Typography level="body-xs">Rating</Typography>
                    <Rating defaultValue={4} readOnly />
                  </Box>

                  <Box>
                    <Typography level="body-xs">Consultation fee</Typography>
                    <Typography level="title-md">${Math.round(rate * 1.1)}/hr</Typography>
                  </Box>
                  <Link to="video">
                    <VideoChat />
                  </Link>
                </Box>
              </Sheet>
            </Box>
          </Box>

          <Tabs aria-label="Basic tabs" className="mt-3" defaultValue={0}>
            <TabList
              sx={{
                pt: 1,
                // justifyContent: 'center',
                [`&& .${tabClasses.root}`]: {
                  flex: "initial",
                  bgcolor: "transparent",
                  // '&:hover': {
                  //   bgcolor: 'transparent',
                  // },
                  [`&.${tabClasses.selected}`]: {
                    color: "primary.plainColor",
                    "&::after": {
                      height: 2,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      bgcolor: "primary.500",
                    },
                  },
                },
              }}
            >
              <Tab>About</Tab>
              {/* <Tab>Availability</Tab> */}
              <Tab>Reviews</Tab>
            </TabList>
            <TabPanel value={0}>
              <Typography level="body-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lectus sapien,
                ullamcorper et tincidunt ut, dignissim sit amet risus. Duis vitae augue cursus,
                tempus enim id, lacinia sapien. Phasellus tristique felis porttitor, volutpat ante
                eu, maximus tellus. Curabitur dignissim nunc nec ullamcorper fringilla. Pellentesque
                suscipit congue ante quis ornare. Quisque sit amet pellentesque risus. In eu commodo
                sapien, a vestibulum quam. In viverra augue et erat faucibus gravida. Vestibulum
                volutpat tempor lacus eu consequat. Nullam mollis condimentum finibus. Integer
                hendrerit tellus vel ex sodales, eu convallis turpis tempus. Praesent id turpis vel
                arcu volutpat aliquet sit amet malesuada lectus. Phasellus feugiat condimentum mi,
                id fermentum dui euismod sit amet.
              </Typography>
            </TabPanel>
            {/* <TabPanel value={1}>
              <Box>
                <Box sx={{ mb: 5 }}>
                  <FormControl id="multiple-limit-tags">
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                      format={dateFormat}
                      onChange={(date, dateString) => setDate(date)}
                      showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
                      className="h-full w-56"
                    />
                  </FormControl>
                </Box>
                <Sheet className="space-y-10">
                  {filteredData.map(([key, value], rowIdx) => {
                    // console.log([key, value]);
                    const dateSplit = key.split("/");
                    return (
                      <Box>
                        <Typography level="body-lg" sx={{ marginBottom: 1 }}>
                          {`${getDayName(key)}, ${getMonthName(key)} ${dateSplit[1]}`}
                        </Typography>

                        <Box className="flex w-full space-x-5 mr-10">
                          {value.map((appointment, colIdx) => {
                            const concat = `${rowIdx}${colIdx}}`;
                            return (
                              <Button
                                key={colIdx}
                                onClick={() => setSelectedIdx(concat)}
                                variant={concat !== selectedIdx ? "outlined" : "solid"}
                                color={concat !== selectedIdx ? "neutral" : "primary"}
                              >
                                {appointment}
                              </Button>
                            );
                          })}
                        </Box>
                      </Box>
                    );
                  })}

                  <Box className="flex w-full justify-between">
                    <Button variant="plain" onClick={() => setSelectedIdx(null)}>
                      Clear selection
                    </Button>
                    <Button variant="outlined" color="primary">
                      Make an appointment
                    </Button>
                  </Box>
                </Sheet>
              </Box>
            </TabPanel> */}
            <TabPanel value={1}>reviews</TabPanel>
          </Tabs>
        </CardContent>
      </Card>
      {/* , backgroundColor: "rgba(255, 255, 255, 0.0)" */}
      <Card className="mt-10" sx={{ p: 4 }}>
        <Box>
          <Typography level="h2" fontWeight={500}>
            Available appointments
          </Typography>
          <Typography level="body-md">
            The shown appointments can be booked up to the nearest 4 days in advance.
          </Typography>
        </Box>
        <Divider />
        <Sheet className="">
          {appointmentContent}

          <Box className="flex w-full justify-end space-x-3">
            <Button
              variant="plain"
              onClick={() => {
                setSelectedIdx(null);
                setDate(null);
                setCurrentTime(null);
                setAppointmentId(null);
                setCurrentTimings([]);
              }}
            >
              Clear selection
            </Button>
            <Button
              onClick={() => {
                navigate(`appointment/${_id}`, {
                  state: {
                    initialDate: date,
                    initialTime: currentTime,
                    initialAppointmentId: appointmentId,
                    initialTimings: currentTimings,
                  },
                });
              }}
              variant="outlined"
              color="primary"
            >
              Make an appointment
            </Button>
            <Link to={`appointment/${_id}/`}>
              <Button color="primary">See more options</Button>
            </Link>
          </Box>
        </Sheet>

        {/* <PatientTest2 /> */}
      </Card>
    </Box>
  );
};

export default DoctorProfile;

// const appointments = ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"]

const appointments = {
  "Thursday, October 12": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Friday, October 13": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Monday October 16": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Tuesday October 17": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
};
const appointments2 = [
  ["11/12/2023", ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"]],
  ["11/15/2023", ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"]],
  ["11/16/2023", ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"]],
  ["11/18/2023", ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"]],
];

// name
// specialty
// sessionPrice
// affiliation
// education
