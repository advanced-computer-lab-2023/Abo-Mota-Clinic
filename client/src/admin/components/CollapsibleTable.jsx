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
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useFetchApplicationsQuery } from '../../store';



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
        }}>
          {row.name}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.rate}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.affiliation}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.email}
        </TableCell>
        <TableCell style={{
          fontSize: '12px',
          align: 'center'
        }}>
          {row.speciality}
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
                <Typography variant="subtitle1" style={{display: 'flex', alignItems: 'center', gap: '105px'}}>
                  <p style={{fontWeight: 'bold'}}>Education</p>
                  {row.educationalBackground}
                </Typography>
                <Typography variant="subtitle1" style={{display: 'flex', alignItems: 'center', gap: '80px'}}>
                  <p style={{fontWeight: 'bold'}}>Medical Degree</p>
                  <Link to={`${row.medicalDegree}`}>View Degree</Link>
                </Typography>
                <Typography variant="subtitle1" style={{display: 'flex', alignItems: 'center', gap: '77px'}}>
                  <p style={{fontWeight: 'bold'}}>Medical License</p>
                  <Link to={`${row.medicalLicense}`}>View License</Link>
                </Typography>
                <div style={{display: 'flex', gap: '20px', marginLeft: '250px'}}>
                    <Button variant="outlined" color="success">
                      Approve
                    </Button>
                    <Button variant="outlined" color="error">
                      Reject
                    </Button>
                </div>
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
    rate: PropTypes.number.isRequired,
    medicalBackground: PropTypes.shape({
      education: PropTypes.string.isRequired,
      degree: PropTypes.string,
      license: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    affiliation: PropTypes.string.isRequired,
  }).isRequired,
};



export default function CollapsibleTable({data}) {
  
  // console.log(data);
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
            }}>Name</TableCell>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>Hourly Rate</TableCell>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>Affiliation</TableCell>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>Email</TableCell>
            <TableCell style={{
              fontSize: '16px',
              align: 'center'
            }}>Speciality</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
