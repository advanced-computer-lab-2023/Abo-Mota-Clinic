import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Typography, Avatar, Box, Stack, Chip } from '@mui/joy';
import { Button } from "@mui/joy";
import capitalize from "../utils/capitalize";

function DoctorHeader({ doctor: { name, specialty }, status, formattedDate, onToggle, expanded }) {
  const statusMap = {
    "filled": "success",
    "unfilled": "danger",
  }

  return (
    <>
      <Stack
        variant="plain"
        orientation="horizontal"
        sx={{
          width: "100%",
          // '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        }}
      >
        <Box>
          <Box className="flex justify-between mb-1">
            <Box className="flex space-x-3">
              <Typography
                level="title-md"
                id="card-description"
              // startDecorator={<AccessTimeIcon fontSize='10' />}
              >
                Prescription
              </Typography>

              <Typography
                level="body-md"
                aria-describedby="card-description"
                mb={1}
              // startDecorator={<AccessTimeIcon fontSize='10' />}
              >
                {/* {"12/07/2023".replace(",", " -")} */}
                {formattedDate}
              </Typography>
            </Box>
            <Chip color={statusMap[status]} variant='soft'>{capitalize(status)}</Chip>
          </Box>
        </Box>


        <Box className="flex justify-between">
          <Box className='flex space-x-4'>
            <Avatar
              alt="ML"
              // src={DoctorImg}
              size="lg"
            />

            <Box className='mr-10'>
              <Typography level="title-lg" id="card-description">
                Dr. {name}
              </Typography>
              <Typography level="body-sm" aria-describedby="card-description">
                {specialty}
              </Typography>
            </Box>
          </Box>

          {/* <IconButton aria-label="expand" size="md" onClick={onToggle}>
            {expanded ? <BiChevronUp /> : <BiChevronDown />}
          </IconButton> */}
        </Box>
        <Box className="w-full flex justify-end">
          <Button
            color="neutral"
            variant="plain"
            onClick={onToggle}
            sx={{ height: 'auto' }}
            endDecorator={
              expanded ? <BiChevronUp fontSize={18}/> : <BiChevronDown fontSize={18} />
            }
          >
            VIEW MORE
          </Button>
        </Box>
      </Stack>
    </>
  )
}

export default DoctorHeader;