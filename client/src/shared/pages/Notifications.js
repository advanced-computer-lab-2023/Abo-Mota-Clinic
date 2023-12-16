import { useFetchNotificationQuery } from "../../store"
import {CircularProgress , Typography, Divider, Box} from '@mui/joy';
import { BiBell } from "react-icons/bi";
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import NotificationCard from "../Components/NotificationCard";
import {useState} from "react";
import dayjs from "dayjs";
export default function Notifications(){

    const { data, error, isFetching: isFetchingNotifications } = useFetchNotificationQuery();
    const [index, setIndex] = useState(0);


    if(isFetchingNotifications) return <CircularProgress size="sm"/>

    console.log(data.notifications);

    const content = data.notifications.map((notification) => {
        return <NotificationCard {...notification} />
    });

    let todayContent = data.notifications.filter((notification) => {
        const notificationDate = dayjs(notification.formattedDate, {format: "MM/DD/YYYY"});
        const today = dayjs();
        return notificationDate.isSame(today, "day");
    
    })

    todayContent = todayContent.map((notification) => {
      return <NotificationCard {...notification} />
    });


    if(todayContent.length === 0){
        todayContent = <Box className="flex justify-center mt-8">
           <Typography level="body-md">No new notifications for today.....</Typography>
        </Box>
    }

    return(
        <div className="ml-14 mt-4 mb-96">
            <Typography level="h2" gutterBottom endDecorator={<BiBell />}>
                Notifications 
            </Typography>

            {/* <Divider/> */}

            {/* TABS */}

        <Tabs
          aria-label="Pipeline"
          value={index}
          onChange={(event, value) => setIndex(value)
          }
          sx={{backgroundColor: "transparent"}}
        >
          <TabList
            sx={{
              pt: 1,
              [`&& .${tabClasses.root}`]: {
                flex: 'initial',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent',
                },
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
            <Tab indicatorInset>
              Today{' '}
              {todayContent.length > 0 && (
                <Chip
                  size="sm"
                  variant="soft"
                  color={index === 0 ? 'primary' : 'neutral'}
                >
                  {todayContent.length}
                </Chip>
              )}
            </Tab>
            <Tab indicatorInset>
              All{' '}
              <Chip
                size="sm"
                variant="soft"
                color={index === 1 ? 'primary' : 'neutral'}
              >
                {data.notifications.length}
              </Chip>
            </Tab>
            
          </TabList>
        
            {/* <TabPanel value={0}>will show today's notif</TabPanel>
            <TabPanel value={1}>all notifs</TabPanel> */}
        </Tabs>

            
        {index === 1? content: todayContent}


      </div>
    )
}