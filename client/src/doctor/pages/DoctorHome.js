import * as React from 'react';
import backgroundImage from "../../shared/assets/doctor.png";
import Button from "@mui/joy/Button";
import Box from '@mui/joy/Box';
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Chip from '@mui/joy/Chip';
import Typography from "@mui/joy/Typography";
import { IoIosGitPullRequest } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag } from 'antd';
import { useFetchAppointmentsQuery, useFetchDoctorQuery } from "../../store";


const DoctorHome = () => {
  const navigate = useNavigate();
  const { data: appointments, error, isFetching } = useFetchAppointmentsQuery();

  if (isFetching) {
    return <CircularProgress />
  }

  const filteredAppointments = appointments.filter((appointment) => {
    return appointment.patient !== null && appointment.date !== null && appointment.status !== 'cancelled';
  });
  console.log("APPPPPPPPPP", filteredAppointments);
  const getCurrentDate = () => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };
  const handleClickPatients = () => {
    navigate("/doctor/patients");
  };
  const handleClickAppointments = () => {
    navigate("/doctor/appointments");
  };
  const handleClickRequests = () => {
    navigate("/doctor/followUpRequests");
  };

  const dataa = filteredAppointments.map((appointment) => ({
    name: appointment.patient.name,
    date: appointment.formattedDate, // You may need to format the date as needed
    email: appointment.patient.email,
    status: appointment.status,
    phoneNumber: appointment.patient.mobile,
  }));

  const columns = [
    {
      title: <Typography className="text-center">Name</Typography>,
      dataIndex: 'name',
       key: 'name',
      render: (name) => (
        <Typography className="text-center">{name}</Typography>
      ),

    },
    {
      title: <Typography className="text-center">Date</Typography>,
      dataIndex: 'date', key: 'date',
      render: (date) => (
        <Typography className="text-center">{date}</Typography>
      ),
    },
    {
      title: <Typography className="text-center">Email</Typography>,
      dataIndex: 'email', key: 'email',
      render: (email) => (
        <Typography className="text-center">{email}</Typography>
      ),
    },
    {
      title: <Typography className="text-center">Status</Typography>,
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <div className="flex justify-center">
        <Chip className="text-center" color={status === 'rescheduled' ? 'success' : 'warning'}>
          <Typography  level="body-xs">
            {status.toUpperCase()}
          </Typography>
        </Chip>
        </div>
      ),
    },
    {       title: <Typography className="text-center">Phone Number</Typography>,
    dataIndex: 'phoneNumber', key: 'phoneNumber',
    render: (phoneNumber) => (
      <Typography className="text-center">{phoneNumber}</Typography>
), },
  ];

  return (
    <div
      className="relative flex flex-col items-center min-h-screen object-scale-down"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      ></div>

      <div className="flex justify-center mt-5 mb-5">
        <div className="w-80 ml-5">
          <Card
            variant="solid"
            color="white"
            text="black"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <CardContent orientation="horizontal">
              <div className="mt-5">
                <CircularProgress size="lg" determinate value={60}>
                  <img
                    src="https://doccure-laravel.dreamguystech.com/template/public/assets/img/icon-01.png"
                    className="img-fluid"
                    alt="patient"
                    style={{ color: "black" }}
                  />
                </CircularProgress>
              </div>
              <CardContent>
                <Typography level="body-md">Total Patients</Typography>
                <Typography level="h2">160</Typography>
                <Typography level="body-md">{getCurrentDate()}</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="md" onClick={handleClickPatients}>
                View Patients
              </Button>
            </CardActions>
          </Card>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-300 h-full mx-5"></div>

        <div className="w-80">
          <Card
            variant="solid"
            color="white"
            text="black"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <CardContent orientation="horizontal">
              <div className="mt-5">
                <CircularProgress size="lg" determinate value={40}>
                  <img
                    src="https://doccure-laravel.dreamguystech.com/template/public/assets/img/icon-03.png"
                    className="img-fluid"
                    alt="patient"
                    style={{ color: "black" }}
                  />
                </CircularProgress>
              </div>
              <CardContent>
                <Typography level="body-md">Appointments</Typography>
                <Typography level="h2">85</Typography>
                <Typography level="body-md">{getCurrentDate()}</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button
                variant="soft"
                size="md"
                onClick={handleClickAppointments}
              >
                View Appointments
              </Button>
            </CardActions>
          </Card>
        </div>

        {/* Vertical divider */}
        <div className="border-l border-gray-300 h-full mx-5"></div>

        <div className="w-80">
          <Card
            variant="solid"
            color="white"
            text="black"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <CardContent orientation="horizontal">
              <div className="mt-5">
                <CircularProgress size="lg" determinate value={20}>
                  <IoIosGitPullRequest
                    className="w-7 h-7"
                    style={{ color: "black" }}
                  />
                </CircularProgress>
              </div>
              <CardContent>
                <Typography level="body-md">Follow Ups</Typography>
                <Typography level="h2">70</Typography>
                <Typography level="body-md">{getCurrentDate()}</Typography>
              </CardContent>
            </CardContent>
            <CardActions>
              <Button variant="soft" size="md" onClick={handleClickRequests}>
                View Follow Ups
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>

      <div className="w-10/12 ml-5 mt-10 rounded-xl">
        <Table columns={columns} dataSource={dataa} />
      </div>



    </div>
  );
};

export default DoctorHome;
