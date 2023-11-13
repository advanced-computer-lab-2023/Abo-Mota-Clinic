import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import Box from '@mui/material/Box';
import Button from "../../shared/Components/Button";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%', // Increased width
    height: 'auto', // Adjust height based on content
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const modalContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px', // Adjust the spacing between items
};



const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%', // Ensure buttons are spaced out over the full width of the modal
    marginTop: '20px', // Adjust spacing above the button group
};

export default function TwoButtonModal({open,handleClose,handleClickLogic}){


    
return (<Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Box sx={modalStyle}>
                <div style={modalContentStyle}>
                    <WarningIcon color="error" style={{ fontSize: 40 }} />
                    <h2 id="simple-modal-title">Are you sure?</h2>
                    <p id="simple-modal-description">
                        Do you really want to cancel your subscription? This action cannot be reversed.
                    </p>
                    <div style={buttonGroupStyle}>
                        <Button type="danger" 
                         
                         onClick={handleClickLogic}
                         >
                            Yes, Cancel Subscription
                        </Button>
                        <Button 
                        onClick={() => {  handleClose(); }}
                        >
                            No, Go Back
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
        );
}
