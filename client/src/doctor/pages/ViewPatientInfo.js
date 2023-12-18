import { Typography } from "@mui/joy";
import { Link, useLocation, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../components/AppointmentCard";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import { Box, Breadcrumbs } from "@mui/joy";
import { Divider } from "@mui/material";
import MiniAppointmentCard from "../components/MiniAppointmentCard";
import PdfViewer from "../components/PdfViewer";
import { Tabs } from "antd";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddHealthRecordScreen from "./AddHealthRecordScreen";
import { useFetchPatientQuery, useFetchPatientsQuery } from "../../store";
import LoadingIndicator from "../../shared/Components/LoadingIndicator";
import { VideoChatRounded } from "@mui/icons-material";
import ChatIcon from '@mui/icons-material/Chat';
import BackArrow from "../../shared/Components/BackArrow";
import Button from "../../shared/Components/Button";
import { useNavigate,  Link as RouterLink  } from "react-router-dom";


export default function ViewPatientInfo() {
  const location = useLocation();
  const { idx } = useParams();
  const navigate = useNavigate();
  const [addHealthRecordOpen, setAddHealthRecordOpen] = useState(false);
  const { data, isFetching, error } = useFetchPatientsQuery();
  if (isFetching) {
    return <LoadingIndicator />;
  }
  const patientData = data[idx];
  const renderedAppointments = patientData.appointments.map((appointment) => {
    return <MiniAppointmentCard appointment={appointment} />;
  });

  const completedApps = patientData.appointments.filter((appointment) => {
    return appointment.status === "completed";
  });
  // console.log(completedApps);

  let recordItems = [];
  if (completedApps.length !== 0) {
    console.log(patientData.healthRecords);
    recordItems = patientData.healthRecords.map((record, index) => {
      //   console.log(record);

      const bytesDegree = new Uint8Array(record.data.data);
      const blobDegree = new Blob([bytesDegree], { type: record.contentType });
      const urlDegree = URL.createObjectURL(blobDegree);
      const pdfUrl = urlDegree;
      return {
        key: index,
        label: `Record ${index + 1}`,
        children: <PdfViewer pdfUrl={pdfUrl} />,
      };
    });
  }

  const medicalHistory = patientData.medicalHistory.map((record, index) => {
    console.log(record);
    const bytesDegree = new Uint8Array(record.data.data);
    const blobDegree = new Blob([bytesDegree], { type: record.contentType });
    const urlDegree = URL.createObjectURL(blobDegree);
    return {
      key: index,
      label: `Record ${index + 1}`,
      children: record.contentType.includes("image") ? (
        <img src={urlDegree} alt="record" />
      ) : (
        <PdfViewer pdfUrl={urlDegree} />
      ),
    };
  });

  return (
    <div className="mt-8 ml-8 mr-8 mb-8 space-y-5 items-center">
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">
          Home
        </Link>
        <Link component={RouterLink} color="neutral" to="../patients">
          Patients
        </Link>
        <Typography>{patientData.name}</Typography>
      </Breadcrumbs>

      <Typography level="h2">
        {capitalizeFirstLetter(patientData.name.split(" ")[0])}'s Medical Record
      </Typography>
      <Box sx={{ width: "1250px" }}>
        <Card className="pl-5 pt-2 justify-content" variant="soft" size="lg">
          <Typography level="h4" fontWeight="lg">
            Patient Information
          </Typography>
          <Divider inset="none" />

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
            <div>
              <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
                National Id
              </Typography>
              <Typography>{patientData.nationalId}</Typography>
            </div>
            <div>
              <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
                Phone Number
              </Typography>
              <Typography>{patientData.mobile}</Typography>
            </div>
            <div>
              <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
                Email
              </Typography>
              <Typography>{patientData.email}</Typography>
            </div>
            <div>
              <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
                Birth Date
              </Typography>
              <Typography>{patientData.formattedDob}</Typography>
            </div>
            <div>
              <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
                Prescriptions
              </Typography>
              {/* <Link to="prescriptions"> */}
              <Button
                type="primary"
                isFilled={false}
                className="text-sm mt-2"
                onClick={() => navigate("prescriptions", { state: { patientId: patientData._id, patientName: patientData.name, idx } })}
              >
                View Prescriptions
              </Button>
              {/* </Link> */}
            </div>
            <div>
              <div className="flex">
                <Typography level="body-md" sx={{ mr: 2 }} fontWeight="lg" textColor="text.tertiary">
                  Want to video call {patientData.name.split(" ")[0]}?
                </Typography>
                <Link to="video">
                  <VideoChatRounded />
                </Link>
              </div>
              <div className="flex">
                <Typography level="body-md" sx={{ mr: 2 }} fontWeight="lg" textColor="text.tertiary">
                  Want to chat with {patientData.name.split(" ")[0]}?
                </Typography>
                <Link to={`../chat/${patientData._id}`}>
                  <ChatIcon />
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </Box>

      <Typography level="h4" fontWeight="lg" color="danger">
        In Case of Emergency
        <Divider inset="none" />
      </Typography>
      <div className="ml-5">
        <Typography level="body-lg" fontWeight="lg">
          {patientData.emergencyContact.name}
        </Typography>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 ml-5">
        <div>
          <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
            Mobile
          </Typography>
          <Typography>{patientData.emergencyContact.mobile}</Typography>
        </div>
        <div>
          <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">
            Relation
          </Typography>
          <Typography>{patientData.emergencyContact.relation}</Typography>
        </div>
      </div>

      <Typography level="h4" fontWeight="lg">
        Appointments
        <Divider inset="none" />
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pr-20 mb-5">
        {renderedAppointments.length === 0 ? (
          <Typography>No appointments</Typography>
        ) : (
          renderedAppointments
        )}
      </div>
      <div>
        <Typography level="h4" fontWeight="lg">
          Health Records
          <Divider inset="none" />
        </Typography>

        {completedApps.length !== 0 && (
          <div
            onClick={() => {
              setAddHealthRecordOpen(true);
            }}
            className="mt-2 flex items-center justify-center gap-1.5 border-2 border-black p-2.5 cursor-pointer text-center w-1/4 hover:bg-black hover:text-white hover:scale-105"
          >
            {" "}
            <AiOutlinePlusCircle size={18} />
            Add Health Record
          </div>
        )}
        {addHealthRecordOpen && (
          <AddHealthRecordScreen
            patient={patientData}
            closeForm={() => {
              setAddHealthRecordOpen(false);
            }}
          />
        )}
        {recordItems.length === 0 ? (
          <Typography>No health Records</Typography>
        ) : (
          <Tabs defaultActiveKey="1" items={recordItems} size="large" />
        )}
      </div>

      <div>
        <Typography level="h4" fontWeight="lg">
          Medical History
          <Divider inset="none" />
        </Typography>
        {medicalHistory.length === 0 ? (
          <Typography>No medical history</Typography>
        ) : (
          <Tabs defaultActiveKey="1" items={medicalHistory} size="large" />
        )}
      </div>
    </div>
  );
}
