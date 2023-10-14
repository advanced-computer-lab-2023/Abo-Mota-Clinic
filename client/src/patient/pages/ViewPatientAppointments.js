import { useFetchPatientAppointmentsQuery } from '../../store';
import AppointmentCard from '../components/AppointmentCard';
import { Box } from '@mui/system';
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Breadcrumbs } from '@mui/joy';

export default function ViewPatientAppointments() {

  const { data, isFetching, isError } = useFetchPatientAppointmentsQuery();
  let content;

  if (isFetching) {
    content = <div> Loading ...</div>;
  } else if (isError) {
    content = <div> Error ... </div>;
  } else {
    content = data.map((appointment) => {
      return (
        // <div>
        <AppointmentCard sx={{ width: '100%' }} {...appointment} />
        // </div>
      );
    });
  }

  return (
    <Box className='w-full ml-20 mt-10 mr-20 space-y-5'>
      <Breadcrumbs aria-label="breadcrumbs" className="mb-2">
        <Link component={RouterLink} color="neutral" to="../">Home</Link>
        <Typography>Appointments</Typography>
      </Breadcrumbs>
      {content}
    </Box>
  );
}