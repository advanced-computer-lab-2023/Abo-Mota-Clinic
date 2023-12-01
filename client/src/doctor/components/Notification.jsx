import React, { useEffect, useState } from "react";

function Notification({socket}) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on("receive_notification", ({sender, content}) => {
            console.log(content);
            setNotifications((prev) => [...prev, content]);
        });
    }
    , [socket]);

  return (
    <div>
        {notifications.map((notification, index) => notification)}
    </div>
  );
};

export default Notification;