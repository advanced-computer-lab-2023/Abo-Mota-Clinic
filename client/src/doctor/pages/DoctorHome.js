import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { IoIosGitPullRequest } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const DoctorHome = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  

  const navigate = useNavigate();
  const getCurrentDate = () => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };
  const handleClickPatients = () => {
    
    navigate('/doctor/patients');
  };
  const handleClickAppointments = () => {
    
    navigate('/doctor/appointments');
  };
  const handleClickRequests = () => {
    
    navigate('/doctor/followUpRequests');
  };
    
  return (
    <div className="flex justify-center mt-5">
      <div className="w-80 ml-5">
        <Card variant="solid" color="white" text="black" style={{ backgroundColor: 'white', color: 'black' }}>
          
          <CardContent orientation="horizontal" >
          <div className="mt-5">
            <CircularProgress  size="lg" determinate value={60} >
              
              <img
              src="https://doccure-laravel.dreamguystech.com/template/public/assets/img/icon-01.png"
              className="img-fluid"
              alt="patient"
              style={{ color: 'black' }}
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
      <Card variant="solid" color="white" text="black" style={{ backgroundColor: 'white', color: 'black' }}>
          <CardContent orientation="horizontal">
          <div className="mt-5">
            <CircularProgress  size="lg" determinate value={40} >
              
              <img
              src="https://doccure-laravel.dreamguystech.com/template/public/assets/img/icon-03.png"
              className="img-fluid"
              alt="patient"
              style={{ color: 'black' }}
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
        <Button variant="soft" size="md" onClick={handleClickAppointments}>
          View Appointments
        </Button>
        
      </CardActions>
        </Card>
      </div>

      {/* Vertical divider */}
      <div className="border-l border-gray-300 h-full mx-5"></div>

      <div className="w-80">
      <Card variant="solid" color="white" text="black" style={{ backgroundColor: 'white', color: 'black' }}>
          <CardContent orientation="horizontal">
          <div className="mt-5">
            <CircularProgress  size="lg" determinate value={20}  >
              
            <IoIosGitPullRequest className="w-7 h-7" style={{ color: 'black' }}/>
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
    
  );
}

export default DoctorHome