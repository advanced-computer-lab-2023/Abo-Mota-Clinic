import { Typography, Skeleton, Box, Avatar, ListItem, ListItemContent } from '@mui/joy'

function SideChatSkeleton() {
  return (
    <Box className="h-full" sx={{ backgroundColor: '#f9f9f9', px: 2, width: '300px' }}>
      <Typography level="h2" sx={{ p: 1 }}>
        <Skeleton>XXXXXX</Skeleton>
      </Typography>

      <Box
        sx={{
          width: '100%',
          height: 30,
          marginTop: 2,
          marginBottom: 5,
        }}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
          }} />
      </Box>

      <Box className="space-y-2">
        {
          Array.from({ length: 7 }).map((_, index) => <ListItem
            sx={{
              px: 1,
              py: 1,
              borderRadius: '5px',
              display: 'flex',
              displayDirection: 'row',
              gap: 1.5,
              border: "1px solid #dddddd  "
            }}

          >

            <Avatar sx={{ width: '3.5em', height: '3.5em' }} color='primary'>
              <Skeleton>
                X
              </Skeleton>
            </Avatar>



            <ListItemContent className="w-full space-y-1">
              <Box className="flex w-full justify-between items-center">
                <Box className="flex space-x-1 items-center">
                  <Typography level="body-md" fontWeight={500} textColor={"#555e68"}>
                    <Skeleton>
                      Omar Elkord - Patient
                    </Skeleton>
                  </Typography>

                </Box>

                <Typography color="secondary" level="body-md">
                  <Skeleton>XXXXXX</Skeleton>
                </Typography>
              </Box>



              <Box className="">
                <Typography level="body-sm" fontWeight={450} textColor="#555e68">
                  {/* <Skeleton>HELLOOOOOOOOOOOOOOOOOOOO</Skeleton> */}
                  <Skeleton>XXXXXXXXXXXXXXXXXXX</Skeleton>
                </Typography>
              </Box>


            </ListItemContent>
          </ListItem>

          )}
      </Box>
    </Box>
  )
}

export default SideChatSkeleton;