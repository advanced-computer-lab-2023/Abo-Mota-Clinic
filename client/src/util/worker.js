/* eslint-disable no-restricted-globals */

self.addEventListener("push", e => {
    //this is the data that we sent from the backend (payload)
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: data.message, //the body of the push notification
            image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
            icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
        }
    );
});