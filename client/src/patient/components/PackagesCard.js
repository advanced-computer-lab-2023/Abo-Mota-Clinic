import Button from "../../shared/Components/Button";
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import Box from '@mui/material/Box';

import { useState } from "react";
const colorSchemes = {
    basic: {
        background: 'bg-blue-200', 
        buttonBg: 'bg-blue-600', 
        buttonText: 'text-white',
    },
    standard: {
        background: 'bg-yellow-200',
        buttonBg: 'bg-yellow-600',
        buttonText: 'text-white',

    },
    premium: {
        background: 'bg-green-200',
        buttonBg: 'bg-green-600',
        buttonText: 'text-white',
    },
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    export default function PackageCard({ pack }) {
    const colors = colorSchemes[pack.type.toLowerCase()] || colorSchemes.basic; 
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

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

    return (
        <div style={{ maxWidth: '350px', width: '100%' }} className={`rounded overflow-hidden shadow-lg m-4 p-6 ${colors.background} flex flex-col items-center space-y-4`}>
        <h3 className="font-bold text-xl mb-2">{pack.title}</h3>
        <p className="text-3xl font-bold">{pack.price}</p>
        <span className="py-1 px-3 rounded-full text-sm font-semibold text-gray-700">
            PER YEAR
        </span>
        <ul className="text-center mb-4">
            {pack.features.map((feature, index) => (
            <li key={index} className="my-2">
                {feature.includes('✓') ? (
                <span className="text-green-500">{feature}</span>
                ) : (
                <span className="text-red-500">{feature}</span>
                )}
            </li>
            ))}
        </ul>
        <div className="text-sm font-semibold">
            Expires on: {pack.expiryDate}
        </div>
        <Button type="danger" onClick={handleOpen}>
            CANCEL
        </Button>
        <Modal
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
                        <Button type="danger"  onClick={() => {  handleClose(); }}>
                            Yes, Cancel Subscription
                        </Button>
                        <Button onClick={handleClose}>
                            No, Go Back
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
        </div>
    );
    }