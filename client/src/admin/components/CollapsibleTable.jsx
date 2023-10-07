import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Add a CSS class to increase the font size

function createData(id, name, hourlyRate, affiliation) {
  return {
    id,
    name,
    hourlyRate,
    affiliation,
    medicalBackground: {
      education: 'lol',
      degree: '11091700',
      license: 'lol',
    },
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{
          fontSize: '16px',
          align: 'center'
        }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }} component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.name}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.hourlyRate}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.affiliation}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ ...{
              fontSize: '16px',
              align: 'center'
            }, paddingBottom: 0, paddingTop: 0 }}
          colSpan={5}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div"
              style={{fontSize: '16px'}}>
                Medical Background
              </Typography>
              <div>
                <Typography variant="subtitle1">
                  <p style={{fontWeight: 'bold'}}>Education</p>
                  Education {row.medicalBackground.education}
                </Typography>
                <Typography variant="subtitle1">
                  Medical Degree {row.medicalBackground.degree}
                </Typography>
                <Typography variant="subtitle1">
                  Medical License: {row.medicalBackground.license}
                </Typography>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    hourlyRate: PropTypes.number.isRequired,
    medicalBackground: PropTypes.shape({
      education: PropTypes.string.isRequired,
      degree: PropTypes.string,
      license: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    affiliation: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData('1', 'John Doe', 'XYZ Affiliation', 3.99),
  createData('2', 'Jane Smith', 'ABC Affiliation', 4.99),
  createData('3', 'Alice Johnson', 'LMN Affiliation', 3.79),
  createData('4', 'Bob Brown', 'PQR Affiliation', 2.5),
  createData('5', 'Eve Davis', 'JKL Affiliation', 1.5),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper} style={{ width: '100%', marginLeft: '20px' }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }} />
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>ID</TableCell>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>Name</TableCell>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>Hourly Rate</TableCell>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>Affiliation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
