import { Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { capitalizeFirstLetter } from "../components/AppointmentCard";
import Sheet from '@mui/joy/Sheet';
import Card from "@mui/joy/Card";
import { Box } from "@mui/joy";
import { Divider } from "@mui/material";
import MiniAppointmentCard from "../components/MiniAppointmentCard";
import PdfViewer from "../components/PdfViewer";
import pdf from "../assets/dummy.pdf"
import { Tabs } from 'antd';
import { useState } from "react";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import AddHealthRecordScreen from "./AddHealthRecordScreen";




export default function ViewPatientInfo (){
    const location = useLocation();
    const patient = location.state;
    const [addHealthRecordOpen, setAddHealthRecordOpen] = useState(false);

    const renderedAppointments = patient.appointments.map((appointment) =>{
        return <MiniAppointmentCard appointment={appointment}/>
    })

    const recordItems = patient.healthRecords.map((record, index) => {
        return {
            key: index,
            label: `Record ${index + 1}`,
            children: <PdfViewer pdfUrl={pdf}/>
        }
    });



    return (
       <div className="mt-8 ml-8 mr-8 space-y-5 items-center">
            <Typography level="h2" >
                {capitalizeFirstLetter(patient.name.split(" ")[0])}'s Medical Record
            </Typography>
            <Box sx={{width: "1250px"}}>
                <Card className="pl-5 pt-2 justify-content" variant="soft" size="lg">
                    <Typography level="h4" fontWeight="lg">Patient Information</Typography>
                    <Divider inset="none"/>

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        <div>
                            <Typography level="body-md" fontWeight="lg" textColor="text.tertiary">National Id</Typography>
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
            <div>
                <Typography level="h4" fontWeight="lg">
                    Health Records
                    <Divider inset="none"/>
                </Typography>

                <Tabs defaultActiveKey="1" items={recordItems} size="large" />     
            </div>    
            <div onClick={() => {setAddHealthRecordOpen(true)}} className="flex items-center justify-center gap-1.5 border-2 border-black p-2.5 cursor-pointer text-center w-1/4 hover:bg-black hover:text-white hover:scale-105" > <AiOutlinePlusCircle size={18} />Add Health Record</div> 
            {addHealthRecordOpen && <AddHealthRecordScreen closeForm={() => {setAddHealthRecordOpen(false)}}/>}
        </div>
    );
};