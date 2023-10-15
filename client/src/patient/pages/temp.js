// import React, { useState, useRef } from 'react';
// import { Menu, MenuItem } from '@mui/joy';
// import AppointmentCard from '../components/AppointmentCard';
// import { Card, CardContent, Typography, Avatar, Box, IconButton } from '@mui/joy';
// import { BiChat } from "react-icons/bi";
// import MedicineCard from '../components/MedicineCard';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
// import MedicationMenu from '../components/MedicationMenu';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import Divider from '@mui/joy/Divider';
// import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined';
// import capitalize from '../utils/capitalize';
// import Chip from '@mui/joy/Chip';
// import { useFetchPrescriptionsQuery } from '../../store';

// import PresDoctorHeader from '../components/PresDoctorHeader';

// const MyComponent = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [menuOpen2, setMenuOpen2] = useState(false);
//   const cardRef = useRef(null);
//   const cardRef2 = useRef(null);
//   const { data, isFetching, error } = useFetchPrescriptionsQuery(0);

//   let content;

//   if (isFetching) {
//     content = <div>Loading...</div>;
//   } else if (error) {
//     content = <div> Error ... </div>;
//   } else {
//     content = data.map((prescription) => {
//       return <>
//         <PresDoctorHeader {...prescription} ref={cardRef} onClose={() => setMenuOpen(!menuOpen)} />
//         <Box className="bg-red-300">
//           <MedicationMenu anchorEl={cardRef.current} open={menuOpen} medicines={prescription.medicines} />
//         </Box>
//         <br />
//         <PresDoctorHeader {...prescription} ref={cardRef2} onClose={() => setMenuOpen2(!menuOpen2)} />
//         <Box className="bg-red-300">
//           <MedicationMenu anchorEl={cardRef2.current} open={menuOpen2} medicines={prescription.medicines} />
//         </Box>
//       </>
//     })
//   }

//   return (
//     <div className='mt-20 ml-20'>
//       {content}
//     </div>
//   );
// }



// export default MyComponent;