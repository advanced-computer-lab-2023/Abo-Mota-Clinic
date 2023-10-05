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


export default function UserCard({data}) {
    const [isEditEmail, setIsEditEmail] = React.useState(false);
    const [isEditRate, setIsEditRate] = React.useState(false);
    const [isEditAffiliation, setIsEditAffiliation] = React.useState(false);

    const [emailValue, setEmailValue] = React.useState("");
    const [rateValue, setRateValue] = React.useState("");
    const [affilValue, setAffilValue] = React.useState("");

    const [renderedData, setRenderedData] = React.useState(data);

    // let renderedData = data;


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

        //send the values in the text area to the backend to update and get the updated data

        if(emailValue !== "")
            setRenderedData({...data, Email: emailValue});

        if(rateValue !== "")
            setRenderedData({...data, HourlyRate: rateValue});

        if(affilValue !== "")
            setRenderedData({...data, Affiliation: affilValue});


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

    



  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
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
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
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
          <Typography fontSize="xl" fontWeight="lg">
            {renderedData.Name}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            {renderedData.Speciality}
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
                    <Typography level="body-xs" fontWeight="lg">
                        Email
                    </Typography>
                    <IconButton onClick={handleEditEmail}>
                        <MdEdit />
                    </IconButton>
                </div>
              {isEditEmail? <Textarea name="Soft" placeholder="Enter New Mail…" variant="outlined" onChange={handleEmailChange} value={emailValue}/> 
                : <Typography fontWeight="lg">{renderedData.Email}</Typography>}
            </div>
            <div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography level="body-xs" fontWeight="lg">
                        Hourly Rate
                    </Typography>
                    <IconButton onClick={handleEditRate}>
                        <MdEdit />
                    </IconButton>
                </div>
              {isEditRate? <Textarea name="Soft" placeholder="Enter New Rate…" variant="outlined" onChange={handleRateChange} value={rateValue}/>
                :<Typography fontWeight="lg">{renderedData.HourlyRate}</Typography>}
            </div>
            <div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography level="body-xs" fontWeight="lg">
                        Affiliation 
                    </Typography>
                    <IconButton onClick={handleEditAffiliation}>
                        <MdEdit />
                    </IconButton>
                </div>
              {isEditAffiliation? <Textarea name="Soft" placeholder="Enter New Affiliation…" variant="outlined" onChange={handleAffilChange} value={affilValue} /> 
                :<Typography fontWeight="lg">{renderedData.Affiliation}</Typography>}
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            {isEditEmail || isEditRate || isEditAffiliation? <Button variant="outlined" color="neutral" onClick={handleSubmit}>
              Done
            </Button>: null}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}