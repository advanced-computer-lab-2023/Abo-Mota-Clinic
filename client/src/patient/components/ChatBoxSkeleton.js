import { Box, Avatar, Skeleton, Typography } from "@mui/joy"

function ChatBoxSkeleton() {
  return (
    <>
      <Box className='grow flex flex-col h-full' sx={{ position: 'relative' }}>
        <Box className="pl-4 py-3 bg-white flex items-center" sx={{ borderBottom: '1px solid #cccccc' }}>
          <Avatar color="primary" className="mr-3">
            <Skeleton>X</Skeleton>
          </Avatar>


          <Typography level="h3" fontWeight={500}>
            <Skeleton>
              XXXXXXXXXXXXXX
            </Skeleton>
          </Typography>

        </Box>

        <Box className="grow chatbox h-full overflow-auto bg-blue-200" sx={{ height: '5px' }}>
          <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
        </Box>

        <Box sx={{
          width: '100%',
          height: '10%',
          px: 5,
          py: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Skeleton animation="wave" variant="rectangular" sx={{ width: '100%', height: '100%', borderRadius: '20px' }} />
        </Box>

      </Box >
    </>
  )
}

export default ChatBoxSkeleton;