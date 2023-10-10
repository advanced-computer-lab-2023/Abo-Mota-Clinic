import { useFetchPatientAppointmentsQuery } from '../../store';
import AppointmentCard from '../components/AppointmentCard';
import { Box } from '@mui/system';

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
          <AppointmentCard sx={{width: '100%'}} {...appointment} />
        // </div>
      );
    });
  }

  return (
    <Box className='w-full ml-20 mt-10 mr-20'>
      {content} 
    </Box>
  );
}