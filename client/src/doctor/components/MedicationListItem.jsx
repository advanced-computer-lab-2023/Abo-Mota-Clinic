import { AspectRatio, Box, Typography, ListItem } from '@mui/joy';

const MedicationListItem = ({ medicine: { name }, dosage, frequency, duration }) => {
  return (
    <ListItem sx={{ margin: "5px" }}>
      <AspectRatio ratio="0.6" sx={{ width: 30, marginLeft: 1, marginRight: 1.5 }}>
        <img
          srcSet={`https://images-cdn.ubuy.co.in/633a9ef26d3a8040c23715a8-centrum-multivitamin-for-men.jpg?w=120&fit=crop&auto=format&dpr=2 2x`}
          src={`https://images-cdn.ubuy.co.in/633a9ef26d3a8040c23715a8-centrum-multivitamin-for-men.jpg?w=120&fit=crop&auto=format`}
          alt={name}
        />
      </AspectRatio>
      <Box className="flex justify-between w-full">
        <Box className="mr-6">
          <Typography level="body-xs">Drug</Typography>
          <Typography level='title-sm' fontWeight="md">{name}</Typography>
        </Box>
        <Box className="justify-items-end">
          <Typography level="body-xs">Dosage</Typography>
          <Typography level="title-sm">{dosage}</Typography>
        </Box>
        <Box className="justify-items-end">
          <Typography level="body-xs">Frequency</Typography>
          <Typography level="title-sm">{frequency}</Typography>
        </Box>
        <Box className="justify-items-end">
          <Typography level="body-xs">Duration</Typography>
          <Typography level="title-sm">{duration}</Typography>
        </Box>
      </Box>
    </ListItem>
  );
}

export default MedicationListItem;