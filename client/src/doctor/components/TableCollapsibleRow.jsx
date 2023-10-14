import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Fragment } from "react";
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import OverFlowModal from './OverflowModal';
import { PDFViewer, pdf } from '@react-pdf/renderer';




function createData(id, name, mobile, formattedDob, gender,emergencyContact, appointments) {
  return{
    id,
    name,
    appointments,
    mobile,
    formattedDob,
    gender,
    emergencyContact,
    healthRecord: [
        {
          Record: "Heart Condition" ,
          Date: '11091700',
        },
        {
            Record: "Heart Condition" ,
            Date: '11091700',
        },
        {
          Record: "Heart Condition" ,
          Date: '11091700',
        },
        {
          Record: "Heart Condition" ,
          Date: '11091700',
        },
        {
          Record: "Heart Condition" ,
          Date: '11091700',
        },
        {
          Record: "Heart Condition" ,
          Date: '11091700',
        },
        {
          Record: "Heart Condition" ,
          Date: '11091700',
        },
      ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);

  console.log(row)

  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td >
        <th scope="row">{row.id}</th>
        <td>{row.name}</td>
        {/* <td>{row.appointment}</td> */}
      </tr>
      <tr>

        <td style={{ height: 0, padding: 0 }} colSpan={3}>


            {/* INFORMATION */}
            {/* <td style={{ height: 0, padding: 0 }} colSpan={6}> */}
            {open && (
                <Sheet
                variant="soft"
                sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)', marginBottom: '1px' }}
                >
  
                  <Box sx={{ margin: 1 }}>
                    <Typography level="body-lg" component="div" style={{marginBottom: "18px"}}>
                        Information
                    </Typography>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div>
                        <Typography variant="caption">
                          <span style={{ fontWeight: 'bold' }}>Full Name:</span> {row.name}
                        </Typography>
                        <Typography variant="caption">
                          <span style={{ fontWeight: 'bold' }}>Patient Id:</span> {row.id}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption">
                          <span style={{ fontWeight: 'bold' }}>Phone Number:</span> {row.mobile}
                        </Typography>
                        <Typography variant="caption">
                          <span style={{ fontWeight: 'bold' }}>Date of Birth:</span> {row.formattedDob}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="caption">
                          <span style={{ fontWeight: 'bold' }}>Gender:</span> {row.gender}
                        </Typography>
                        <Typography variant="caption">
                           <OverFlowModal list={row.emergencyContact} buttonLabel={"View Emergency Contact"} ModalTitle={"Emergency Contact"} isAppointment={false} isContact={true} />
                        </Typography>
                      </div>
                      
                      <div>
                        <Typography variant="caption">
                           <OverFlowModal list={row.appointments} buttonLabel={"View Appointments"} ModalTitle={"Appointments"} isAppointment={true} />
                        </Typography>
                        <Typography variant="caption">
                          <OverFlowModal list={row.healthRecord} buttonLabel={"View Health Records"} ModalTitle={"Health Record"} isAppointment={false} />
                          
                        </Typography>
                      </div>

                    </div>
                  </Box>
                </Sheet>
            )}
            {/* </td> */}


            {/* HEALTH RECORD */}

            {/* <td style={{ height: 0, padding: 0 }} colSpan={6}> */}
            {/* {open && (
                <Sheet
                variant="soft"
                sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)', marginBottom: '5px' }}
                >
                <Typography level="body-lg" component="div">
                    Health Record
                </Typography>
                <Table
                    borderAxis="bothBetween"
                    size="sm"
                    aria-label="purchases"
                    sx={{
                    '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                        { textAlign: 'left' },
                    '--TableCell-paddingX': '0.5rem',
                    }}
                >
                    <thead>
                    <tr>
                        <th>Record</th>
                        <th>Date</th>
                    
                    </tr>
                    </thead>
                    <tbody>
                    {row.healthRecord.map((recordRow) => (
                        <tr key={recordRow.Record}>
                        <th scope="row">{recordRow.Record}</th>
                        <td>{recordRow.Date}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Sheet>
            )} */}
        </td>
      </tr>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   initialOpen: PropTypes.bool,
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };


export default function TableCollapsibleRow({data}) {

    const rows = data.map((rowData) => {
        return createData(rowData.id, rowData.name, rowData.mobile, rowData.formattedDob, rowData.gender, rowData.emergencyContact, rowData.appointments)

    })

    // console.log(rows)

    return (
        <TableContainer component={Paper} style={{ width: '100%', marginLeft: '10px' }}>
          <Table
            aria-label="collapsible table"
            sx={{
              '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                { textAlign: 'left',   },
              '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
                {
                  borderBottom: 0,
                },
            }}
            
          >
            <thead>
              <tr>
                <th style={{ width: 60 }} aria-label="empty" />
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Row key={row.name} row={row} initialOpen={index === -1} />
              ))}
            </tbody>
          </Table>
        </TableContainer>
      );
}