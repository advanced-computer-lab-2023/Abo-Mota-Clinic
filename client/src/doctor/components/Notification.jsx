import React, { useEffect, useState } from "react";
import { useFetchNotificationQuery } from "../../store";

function Notification({socket}) {
    const { data, isFetching , error } = useFetchNotificationQuery();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      const handleReceiveNotification = ({ sender, contentDoctor }) => {
        console.log(contentDoctor);
        setNotifications(prev => [...prev, contentDoctor]);
      };
  
      // Attach the event listener
      socket.on("receive_notification_booked", handleReceiveNotification);
  
      
    }, [socket]);


    useEffect(() => {
      if(!isFetching){
        console.log("NOTIF1", data.notifications);
        const notif = data.notifications.filter((notification) => notification != null)
                                        .map((notification, index) => notification.content);
        setNotifications(notif);

      }

    }, [isFetching]);

    if (isFetching) return <div>Loading...</div>;

    if(!isFetching)
      console.log("NOTIF2", notifications);
  return (
    <div>
        {!isFetching && notifications.map((notification, index) => <div>{notification}</div>)}
    </div>
  );
};

export default Notification;