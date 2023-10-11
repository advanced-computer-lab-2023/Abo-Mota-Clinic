import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import { MdEdit } from "react-icons/md";
import {useFetchDoctorQuery, useUpdateDoctorMutation} from '../../store';
import Input from '@mui/joy/Input';
import { NumericFormat } from 'react-number-format';

import emailValidator from 'email-validator';
import Toast from '../../patient/components/Toast';





export default function UserCard() {
    
    // console.log(data);
    const {data,error,isFetching} = useFetchDoctorQuery();
    const [updateDoctor, result] = useUpdateDoctorMutation();
    const [isEditEmail, setIsEditEmail] = React.useState(false);
    const [isEditRate, setIsEditRate] = React.useState(false);
    const [isEditAffiliation, setIsEditAffiliation] = React.useState(false);

    const [emailValue, setEmailValue] = React.useState("");
    const [rateValue, setRateValue] = React.useState("");
    const [affilValue, setAffilValue] = React.useState("");

    const [open, setOpen] = React.useState(false);


    

    const handleEditEmail = () => {
        setIsEditEmail(true);
    }
    const handleEditRate = () => {
        setIsEditRate(true);
    }
    const handleEditAffiliation = () => {
        setIsEditAffiliation(true);
    }

    const handleSubmit = () => {
        setIsEditEmail(false)
        setIsEditRate(false);
        setIsEditAffiliation(false);
        const updated = {email: data.email, affiliation: data.affiliation, rate: data.rate, id: data.id};
        if(emailValue !== ""){
          if(!validateEmail(emailValue)){
              setOpen(true);
              return;
          }
          else
            updated.email = emailValue;
        }
            
        if(rateValue !== ""){
          updated.rate = parseInt(rateValue);
        }

        if(affilValue !== ""){
          updated.affiliation = affilValue;
        }

        updateDoctor(updated);
    }

    const handleEmailChange = (event) => {
        setEmailValue(event.target.value)
    }

    const handleRateChange = (event) => {
        setRateValue(event.target.value);
    }

    const handleAffilChange = (event) => {
        setAffilValue(event.target.value)
    }

    const NumericFormatAdapter = React.forwardRef(function NumericFormatAdapter(
      props,
      ref,
    ) {
      const { onChange, ...other } = props;
    
      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          valueIsNumericString
          prefix="$"
          suffix='/h'
        />
      );
    });

    const validateEmail = (email) => {
      return emailValidator.validate(email);
    };

    const onToastClose = (event, reason) => {
      if (reason === 'clickaway')
        return;
  
      setOpen(false)
    };
  
  

  return (
    <Box
      sx={{
        width: '100%',
        // position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
          // position: 'absolute',
          display: 'block',
          width: '1px',
          bgcolor: 'warning.300',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
          '&::before': {
            top: '4px',
            content: '"vertical"',
            display: 'block',
            position: 'absolute',
            right: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
          '&::after': {
            top: '4px',
            content: '"horizontal"',
            display: 'block',
            position: 'absolute',
            left: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
         
          overflow: 'hidden',
          // resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography level='h1' fontWeight="lg">
            {data.name}
          </Typography>
          <Typography level="body-lg" fontWeight="lg" textColor="text.tertiary">
            {data.specialty}
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex-column',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography level="body-lg" fontWeight="lg" textColor="text.tertiary">
                        Email
                    </Typography>
                    <IconButton onClick={handleEditEmail}>
                        <MdEdit />
                    </IconButton>
                </div>
              {isEditEmail? <Input name="Soft" placeholder="Enter New Mail…" variant="outlined" 
                            onChange={handleEmailChange} value={emailValue} type="email" /> 
                : <Typography fontWeight="lg">{data.email}</Typography>}
            </div>
            <div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography level="body-lg" fontWeight="lg" textColor="text.tertiary">
                        Hourly Rate
                    </Typography>
                    <IconButton onClick={handleEditRate}>
                        <MdEdit />
                    </IconButton>
                </div>
              {isEditRate? <Input name="Soft" placeholder="Enter New Rate…" variant="outlined" onChange={handleRateChange} value={rateValue} 
                        slotProps={{
                        input: {
                          component: NumericFormatAdapter,
                        },
                        
                      }}/>
                :<Typography fontWeight="lg">${data.rate}/h</Typography>}
            </div>
            <div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography level="body-lg" fontWeight="lg" textColor="text.tertiary">
                        Affiliation 
                    </Typography>
                    <IconButton onClick={handleEditAffiliation}>
                        <MdEdit />
                    </IconButton>
                </div>
              {isEditAffiliation? <Input name="Soft" placeholder="Enter New Affiliation…" variant="outlined" onChange={handleAffilChange} value={affilValue} /> 
                :<Typography fontWeight="lg">{data.affiliation}</Typography>}
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            {isEditEmail || isEditRate || isEditAffiliation? <Button variant="outlined" color="neutral" onClick={handleSubmit}>
              Done
            </Button>: null}
          </Box>
        </CardContent>
      </Card>

      <Toast open={open} onClose={onToastClose} variant="soft" color="danger" message="Enter Email in something@something.com Format" duration={4000}/>
    </Box>
  );
}