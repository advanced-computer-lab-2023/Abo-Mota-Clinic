const webPush = require('web-push');

const subscribe = (req, res) => {
    //get push subscription object from the request
    const subscription = req.body.subscription;
    
    const message = req.body.message;

    //send status 201 for the request
    res.status(201).json({message: 'Subscription successful'})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({title: 'Notification', message: message });

    //pass the object into sendNotification fucntion and catch any error
    webPush.sendNotification(subscription, payload).catch(err=> console.error(err));
};

module.exports = { subscribe };