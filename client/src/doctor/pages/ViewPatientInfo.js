import { Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../components/AppointmentCard";
import Sheet from '@mui/joy/Sheet';
import Card from "@mui/joy/Card";
import { Box } from "@mui/joy";
import { Divider } from "@mui/material";
import AppointmentCard from "../components/AppointmentCard";
import MiniAppointmentCard from "../components/MiniAppointmentCard";
import { Document, PDFViewer, pdf } from '@react-pdf/renderer';
import { Page } from "react-pdf";

export default function ViewPatientInfo (){
    const location = useLocation();
    const patient = location.state;

    const renderedAppointments = patient.appointments.map((appointment) =>{
        return <MiniAppointmentCard appointment={appointment}/>
    })

    return (
       <div className="mt-8 ml-8 mr-8 space-y-5 items-center">
            <Typography level="h2" >
                {capitalizeFirstLetter(patient.name)}'s Medical Record
            </Typography>
            <Box sx={{width: "1250px"}}>
                <Card className="pl-5 pt-2 justify-content" variant="soft" size="lg">
                    <Typography level="h4" fontWeight="lg">Patient Information</Typography>
                    <Divider inset="none"/>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        <div>
                            <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">Patient National Id</Typography>
                            <Typography>{patient.nationalId}</Typography>
                        </div>
                        <div>
                            <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">Phone Number</Typography>
                            <Typography>{patient.mobile}</Typography>
                        </div>
                        <div>
                            <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">Email</Typography>
                            <Typography>{patient.email}</Typography>
                        </div>
                        <div>
                            <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">Birth Date</Typography>
                            <Typography>{patient.formattedDob}</Typography>
                        </div>
                    </div>

                </Card>

            </Box>

            <Typography level="h4" fontWeight="lg" color="danger">
                In Case of Emergency
                <Divider inset="none"/>
            </Typography>
            <div className="ml-5">
                <Typography level="body-lg" fontWeight="lg">{patient.emergencyContact.name}</Typography>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 ml-5">
            
                <div>
                    <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">Mobile</Typography>
                    <Typography>{patient.emergencyContact.mobile}</Typography>
                </div>   
                <div>
                    <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">Relation</Typography>
                    <Typography>{patient.emergencyContact.relation}</Typography>
                </div>        
            </div>


            <Typography level="h4" fontWeight="lg">
                Appointments
                <Divider inset="none"/>
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pr-20 mb-5">
                {renderedAppointments}
            </div>
            <Typography level="h4" fontWeight="lg">
                Health Record
                <Divider inset="none"/>
            </Typography>

            <PDFViewer>
                <pdf src="../assests/dummy.pdf"/>
            </PDFViewer>

        </div>
    );
};