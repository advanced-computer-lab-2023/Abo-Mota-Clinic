import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import { Snackbar } from '@mui/material';

export default function Toast({ open, onClose, variant, color, message, duration }) {

  let icon;
  switch (color) {
    case "neutral":
      icon = <InfoIcon />;
      break;
    case "warning":
      icon = <WarningIcon />;
      break;
    case "danger":
      icon = <ReportIcon />;
      break;
    case "success":
      icon = <CheckCircleIcon />;
      break;
    default:
      icon = <InfoIcon />;
      break;
  }

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
    >
      <Alert
        startDecorator={icon}
        variant={variant}
        color={color}
        endDecorator={
          <React.Fragment>
            <IconButton color={color} variant="plain" onClick={onClose}>
              {/* <CloseIcon /> */}
              <CloseRoundedIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}