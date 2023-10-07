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





function createData(id, name, appointment, information) {
  return {
    id,
    name,
    appointment,
    information,
    healthRecord: [
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
        <td>{row.appointment}</td>
      </tr>
      <tr>

        <td style={{ height: 0, padding: 0 }} colSpan={4}>


            {/* INFORMATION */}
            {/* <td style={{ height: 0, padding: 0 }} colSpan={6}> */}
            {open && (
                <Sheet
                variant="soft"
                sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)', marginBottom: '1px' }}
                >
                  {/* <Typography level="body-lg" component="div">
                      Information
                  </Typography> */}
                  {/* <Table
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
                          <th>Full Name</th>
                          <th>Patient Id</th>
                          <th>Phone Number</th>
                          <th>DOB</th>
                          <th>Gender</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr key={row.key}>
                          <th scope="row">{row.information.fullName}</th>
                          <td>{row.information.patientId}</td>
                          <td>{row.information.phoneNumber}</td>
                          <td>{row.information.dob}</td>
                          <td>{row.information.gender}</td>
                          </tr>
                      </tbody>
                  </Table> */}

                  <Box sx={{ margin: 1 }}>
                    <Typography level="body-lg" component="div" style={{marginBottom: "18px"}}>
                        Information
                    </Typography>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div>
                        <Typography variant="subtitle1">
                          <span style={{ fontWeight: 'bold' }}>Full Name:</span> {row.information.fullName}
                        </Typography>
                        <Typography variant="subtitle1">
                          <span style={{ fontWeight: 'bold' }}>Patient Id:</span> {row.information.patientId}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle1">
                          <span style={{ fontWeight: 'bold' }}>Phone Number:</span> {row.information.phoneNumber}
                        </Typography>
                        <Typography variant="subtitle1">
                          <span style={{ fontWeight: 'bold' }}>Date of Birth:</span> {row.information.dob}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle1">
                          <span style={{ fontWeight: 'bold' }}>Gender:</span> {row.information.gender}
                        </Typography>
                        <Typography variant="subtitle1">
                          <span style={{ fontWeight: 'bold' }}>Emergency Contact:</span> {row.information.emergency}
                        </Typography>
                      </div>

                    </div>
                  </Box>
                </Sheet>
            )}
            {/* </td> */}


            {/* HEALTH RECORD */}

            {/* <td style={{ height: 0, padding: 0 }} colSpan={6}> */}
            {open && (
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
            )}
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

// const rows = [

//   createData(1,'Sara', '10/5/2023'),
//   createData(2,'Omar', '10/20/2023'),
//   createData(3,'Ahmed', '8/5/2023'),
//   createData(4,'Boni', '10/15/2023'),
//   createData(5,'Malak', '11/5/2023'),


// ];

export default function TableCollapsibleRow({data, config}) {

    const rows = data.map((rowData) => {
        return createData(rowData.id, rowData.name, rowData.appointment, rowData.information)
    })

    console.log(rows)

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
                <th>Appointment</th>
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