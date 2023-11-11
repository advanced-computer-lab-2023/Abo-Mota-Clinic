import {useState} from "react";
import Button from "../../shared/Components/Button";
import Modal from '@mui/material/Modal';
import WarningIcon from '@mui/icons-material/Warning';
import Box from '@mui/material/Box';
import ReactFlipCard from 'reactjs-flip-card'

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
    const flipCardStyles = {
        width: '100%',
        height: '100%',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        // Add any other styles you want for the flipping card
      };

      const containerStyles = {
        maxWidth: '350px',
        width: '100%',
        margin: '1rem',
        perspective: '1000px', // Required for flip effect
        // Add any other styles you want for the container
      };
    
    

    export default function PackageCard({ data }) {
    
    console.log(data);
    
    const colors = colorSchemes[data.package.name.toLowerCase()] || colorSchemes.basic; 
    
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      
    
    const cardClasses = `rounded overflow-hidden shadow-lg m-4 p-6 ${colors.background} flex flex-col items-center space-y-4`;
    


    return (
        <>
        <ReactFlipCard 
        containerStyle={containerStyles}
        flipCardStyle={flipCardStyles}
        frontComponent={
            <Front data={data} handleOpen={handleOpen} cardClasses={cardClasses}/>
        }
        backComponent={<Front data={data} handleOpen={handleOpen} cardClasses={cardClasses}/>}/> 

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
                        <Button type="danger" 
                         onClick={() => {  handleClose(); }}
                         >
                            Yes, Cancel Subscription
                        </Button>
                        <Button 
                        onClick={handleClose}
                        >
                            No, Go Back
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
        </>
         
    );
    }

    function Front({data,handleOpen, cardClasses})
    {
        
        const formattedDate = new Date(data.expiryDate).toLocaleDateString('en-GB', {
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric'
        });
        return  <div className={cardClasses}>
        <h3 className="font-bold text-xl mb-2">{data.package.name}</h3>
        <p className="text-3xl font-bold">${data.package.pricePerYear}</p>
        <span className="py-1 px-3 rounded-full text-sm font-semibold text-gray-700">
            PER YEAR
        </span>
        <div className="text-center mb-4">
        <div className="my-2">
        {data.package.pharmacyDiscount > 0 ? (
            <span className="font-normal text-green-600">✓ {data.package.pharmacyDiscount*100}% discount on all pharmacy products</span>
        ) : (
            <span className="font-normal text-red-500">✕ No discount on pharmacy products</span>
        )}
        </div>
        <div className="my-2">
        {data.package.familyDiscount > 0 ? (
            <span className="font-normal text-green-600">✓ {data.package.familyDiscount*100}% discount for your family</span>
        ) : (
            <span className="font-normal text-red-500">✕ No family discount</span>
        )}
        </div>
        <div className="my-2">
        {data.package.doctorDiscount > 0 ? (
            <span className="font-normal text-green-600">✓ {data.package.doctorDiscount*100}% discount on doctor appointments</span>
        ) : (
            <span className="font-normal text-red-500">✕ No discount on doctor appointments</span>
        )}
        </div>
        </div>

        <div className="text-sm font-semibold">
            Expires on: {formattedDate}
        </div>
        <Button type="danger" 
        onClick={handleOpen}
        >
            CANCEL
        </Button>
        </div> 
    }