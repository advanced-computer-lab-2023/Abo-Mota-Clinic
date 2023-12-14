import {useState} from "react";
import Button from "../../shared/Components/Button";
import ReactFlipCard from 'reactjs-flip-card'
import TwoButtonModal from "../../shared/Components/TwoButtonModal";
import { cardClasses } from "@mui/material";
import { useCancelMyPackageMutation } from "../../store";
import { useCancelMyFamilyPackageMutation } from "../../store";

const colorSchemes = {
    basic: {
        background: 'bg-blue-200', 
        buttonBg: 'bg-blue-600', 
        buttonText: 'text-white',
    },
    titanium: {
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
    
    const containerStyles = {
        maxWidth: '350px',
        width: '100%',
        height: 'auto', 
        margin: '1rem',
        perspective: '1000px'
    };
    
    
    export default function PackageCard({ data }) {
    
    console.log(data);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => setIsFlipped(!isFlipped);
    
    const colors = colorSchemes[data.package.name.toLowerCase()] || colorSchemes.basic; 
    
    const [open, setOpen] = useState(false);
    const [cancelMyPackage,results] = useCancelMyPackageMutation();
    const [cancelFamilyPackage,result]= useCancelMyFamilyPackageMutation();
    const handleOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
      };
      
    
      const cardClasses = ` overflow-hidden shadow-lg m-4 ${colors.background} flex flex-col items-center space-y-2 p-4 w-full h-full box-border transform-style: preserve-3d;`;

    const hasName = !!data.name;

    const flipCardComponent = (
        <ReactFlipCard 
            isFlipped={isFlipped}
            flipTrigger="onClick"
            containerStyle={containerStyles}

            frontComponent={
                <Front data={data} onFlip={handleFlip} cardClasses={cardClasses}/>
                
            }
            backComponent={<Back data={data} handleOpen={handleOpen} cardClasses={cardClasses}/>}/>
    );
    const nonFlipCardComponent = (
        <div style={containerStyles}>
                <Back data={data} handleOpen={handleOpen} cardClasses={cardClasses}/>
        </div>
    );

    const handleClickLogic =()=>{
        if(!data.name)
        {
            cancelMyPackage();
        }
        else
        {
            cancelFamilyPackage({familyMemberUsername:data.name});
        }
        setOpen(false);
    }

    const message = 'Are you sure you want to cancel your subscription? This action cannot be reversed.'

    return (
        <>
            {hasName ? flipCardComponent : nonFlipCardComponent}
            <TwoButtonModal handleClose={handleClose} open={open} handleClickLogic={handleClickLogic} message={message}/>
        </>
    );
    }

    

    function Back({data,handleOpen, cardClasses})
    {
        const formattedDate = new Date(data.endDate).toLocaleDateString('en-GB', {
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric'
        });
        let status='Subscribed';
        let content =`Renewal Date: ${formattedDate}`
        if(data.status==='unsubscribed')
        {
            content = `Expires on: ${formattedDate}`
            status='Unsubscribed';
        }
            
        else if (data.status==='cancelled')
        {
            const formattedDate = new Date(data.cancelDate).toLocaleDateString('en-GB', {
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric'
            });
            status='Cancelled';
            content = `Cancelled on: ${formattedDate}`
        }
            
        
        
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
        
        <div className="text-center text-sm font-semibold">
        <strong>{status}</strong> <br/>{content}    
        </div>
        {(status==='Cancelled')||<Button type="danger" 
        onClick={handleOpen}>
        CANCEL
        </Button>}
        
        </div>
    }

    function Front({ data, onFlip, cardClasses }) {
        return(
            <div className={`${cardClasses} flex flex-col justify-center items-center h-full`}>
                <h3 className="font-bold text-2xl mb-2  ">{data.name}'s Package</h3>
                <p className="text-lg text-center mb-4 text-gray-600">
                    Tap to view more info
                </p>
            </div>
        );
    }