import { AspectRatio, Card, Divider, Typography, Sheet, Button, CardContent, Tabs, TabList, TabPanel, Box, Tab} from "@mui/joy";
import Rating from "@mui/material/Rating";
import { tabClasses } from '@mui/joy/Tab';
import DoctorImg from '../assets/images/doctor.jpg';
import { useState } from "react";

const DoctorProfile = ({ name, specialty, rate, educationalBackground, affiliation }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  return (
    <Box className="w-full ml-20 mr-20 mt-10"
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >

      <Card
        orientation="vertical"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // padding: '20px',
          // p: 5,
          // make the card resizable for demo
          overflow: 'auto',
          // resize: 'vertical',
        }}
      >

        <CardContent>
          <Box name="card-header" className="flex p-5">
            <AspectRatio
              className="flex"
              ratio="1"
              sx={{
                width: 280,
                borderRadius: '100%',
                bgcolor: 'background.level2',
                marginRight: 5
                // borderRadius: 'md',
              }}
            >
              <img
                src={DoctorImg}
                loading="lazy"
                alt="Doctor"
              />
            </AspectRatio>

            <Box name="side-body" className="w-full">
              <Typography level="h1" fontWeight="lg">
                Dr. {name}
              </Typography>
              <Typography level="h4" textColor="text.tertiary" fontWeight={400}>
                {specialty}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Sheet
                sx={{
                  // bgcolor: 'background.level1',
                  borderRadius: 'sm',
                  // p: 1.5,
                  my: 1.5,
                  display: 'flex',
                  gap: 2,
                  '& > div': { flex: 1 },
                }}
              >
                <Box className="space-y-3">
                  <Box>
                    <Typography level="body-xs">
                      Affiliation
                    </Typography>
                    <Typography level="title-md">{affiliation}</Typography>
                  </Box>

                  <Box>
                    <Typography level="body-xs">
                      Educational background
                    </Typography>
                    <Typography level="title-md">M.D., {educationalBackground}</Typography>
                  </Box>
                </Box>

                <Box className="space-y-3">
                  <Box>
                    <Typography level="body-xs">
                      Rating
                    </Typography>
                    <Rating defaultValue={4} readOnly />
                  </Box>

                  <Box>
                    <Typography level="body-xs">
                      Consultation fee
                    </Typography>
                    <Typography level="title-md">${rate}/hr</Typography>
                  </Box>
                </Box>
              </Sheet>
            </Box>
          </Box>

          <Tabs aria-label="Basic tabs" className="mt-3" defaultValue={0}>
            <TabList
              sx={{
                pt: 1,
                // justifyContent: 'center',
                [`&& .${tabClasses.root}`]: {
                  flex: 'initial',
                  bgcolor: 'transparent',
                  // '&:hover': {
                  //   bgcolor: 'transparent',
                  // },
                  [`&.${tabClasses.selected}`]: {
                    color: 'primary.plainColor',
                    '&::after': {
                      height: 2,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                      bgcolor: 'primary.500',
                    },
                  },
                },
              }}
            >
              <Tab>About</Tab>
              <Tab>Availability</Tab>
              <Tab>Reviews</Tab>
            </TabList>
            <TabPanel value={0}>
              <Typography level="body-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lectus sapien, ullamcorper et tincidunt ut, dignissim sit amet risus. Duis vitae augue cursus, tempus enim id, lacinia sapien. Phasellus tristique felis porttitor, volutpat ante eu, maximus tellus. Curabitur dignissim nunc nec ullamcorper fringilla. Pellentesque suscipit congue ante quis ornare. Quisque sit amet pellentesque risus. In eu commodo sapien, a vestibulum quam. In viverra augue et erat faucibus gravida. Vestibulum volutpat tempor lacus eu consequat. Nullam mollis condimentum finibus. Integer hendrerit tellus vel ex sodales, eu convallis turpis tempus. Praesent id turpis vel arcu volutpat aliquet sit amet malesuada lectus. Phasellus feugiat condimentum mi, id fermentum dui euismod sit amet.
              </Typography>
            </TabPanel>
            <TabPanel value={1}>
              <Sheet className="space-y-10">

                {
                  Object.entries(appointments).map(([key, value], rowIdx) => {
                    return (
                      <Box>
                        <Typography level="body-lg" sx={{ marginBottom: 1 }}>
                          {key}
                        </Typography>

                        <Box className="flex w-full space-x-5 mr-10">
                          {
                            value.map((appointment, colIdx) => {
                              const concat = `${rowIdx}${colIdx}}`
                              return (
                                <Button key={colIdx} onClick={() => setSelectedIdx(concat)} variant={concat !== selectedIdx ? "outlined" : "solid"} color={concat !== selectedIdx ? "neutral" : "primary"}>
                                  {appointment}
                                </Button>
                              );
                            })
                          }
                        </Box>
                      </Box>
                    );
                  })
                }

                <Box className="flex w-full justify-between">
                  <Button variant="plain" onClick={() => setSelectedIdx(null)}>
                    Clear selection
                  </Button>
                  <Button variant="outlined" color="primary">
                    Make an appointment
                  </Button>
                </Box>
              </Sheet>
            </TabPanel>
            <TabPanel value={2}>
              View reviews
            </TabPanel>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-10" sx={{ p: 4 }}>
        <Box>
          <Typography level="h2" fontWeight={500}>
            Available appointments

          </Typography>
          <Typography level="body-md">
            Appointments can be booked up to a week in advance
          </Typography>
        </Box>
        <Divider />
        <Sheet className="">
          {
            Object.entries(appointments).map(([key, value], rowIdx) => {
              return (
                <Box>
                  <Typography level="body-lg" sx={{ marginBottom: 1.5 }}>
                    {key}
                  </Typography>

                  <Box className="flex w-full space-x-6 mr-10">
                    {
                      value.map((appointment, colIdx) => {
                        const concat = `${rowIdx}${colIdx}}`
                        return (
                          <Button
                            key={colIdx}
                            onClick={() => setSelectedIdx(concat)}
                            variant={concat !== selectedIdx ? "soft" : "solid"}
                            color={concat !== selectedIdx ? "neutral" : "primary"}
                            className="h-10"
                          >
                            {appointment}
                          </Button>
                        );
                      })
                    }
                  </Box>
                  {rowIdx !== Object.entries(appointments).length - 1 && <Divider sx={{ my: 2.5 }} />}

                </Box>
              );
            })
          }

          <Box className="flex w-full justify-end space-x-3">
            <Button variant="plain" onClick={() => setSelectedIdx(null)}>
              Clear selection
            </Button>
            <Button variant="outlined" color="primary">
              Make an appointment
            </Button>
          </Box>
        </Sheet>
      </Card>
    </Box>
  );
};

export default DoctorProfile;

// const appointments = ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"]

const appointments = {
  "Thursday, October 12": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Friday, October 13": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Monday October 16": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
  "Tuesday October 17": ["10:00 AM", "12:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"],
}



// name
// specialty
// sessionPrice
// affiliation
// education
