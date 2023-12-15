import { useFetchNotificationQuery } from "../../store"
import {CircularProgress , Typography, Divider} from '@mui/joy';
import { BiBell } from "react-icons/bi";
import NotificationCard from "../Components/NotificationCard";
export default function Notifications(){

    const { data, error, isFetching: isFetchingNotifications } = useFetchNotificationQuery();

    if(isFetchingNotifications) return <CircularProgress size="sm"/>

    console.log(data);

    const content = data.notifications.map((notification) => {
        return <NotificationCard notification={notification} />
    });

    return(
        <div className="ml-14 mt-4">
            <Typography level="h2" gutterBottom endDecorator={<BiBell />}>
                Notifications 
            </Typography>

            <Divider className="mb-4" />


        </div>
    )
}