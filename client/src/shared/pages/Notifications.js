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
export default function Notifications(){

    const { data, error, isFetching: isFetchingNotifications } = useFetchNotificationQuery();
    const [index, setIndex] = useState(0);


    if(isFetchingNotifications) return <CircularProgress size="sm"/>

    console.log(data.notifications);

    const content = data.notifications.map((notification) => {
        return <NotificationCard {...notification} />
    });

    return(
        <div className="ml-14 mt-4">
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
            <Chip
              size="sm"
              variant="soft"
              color={index === 0 ? 'primary' : 'neutral'}
            >
              14
            </Chip>
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


            {content}


        </div>
    )
}