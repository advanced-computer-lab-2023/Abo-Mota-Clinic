const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

const getMessages = async (req, res) => {
  try {
    const username = req.userData.username;
    const recipient = req.query.recipient;

    let sender;
    sender = await Doctor.findOne({ username });

    if (!sender)
      sender = await Patient.findOne({ username });

    if (!sender)
      throw new Error("This sender does not exist");

    const messages = await Message.find({
      $or: [
        { sender: sender._id, recipient: recipient },
        { sender: recipient, recipient: sender._id }
      ]
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const username = req.userData.username;
    const { content, recipient } = req.body;

    let sender;
    sender = await Doctor.findOne({ username });

    if (!sender)
      sender = await Patient.findOne({ username });

    if (!sender)
      throw new Error("This sender does not exist");

    const message = {
      content,
      sender: sender._id,
      recipient: recipient,
      // date: Date.now(), 
    }

    await Message.create(message);
    res.status(200).json({ message: "Message sent successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotifications = async (req, res) => {
    try{
        const {username , userType }= req.userData;

        let user;
        if(userType.toLowerCase() === 'patient')
            user = await Patient.findOne({ username });
        if(userType.toLowerCase() === 'doctor')
            user = await Doctor.findOne({ username });

        const notifications = await Promise.all(user.notifications.map(async (notificationId) => {
          return await Notification.findOne({ _id: notificationId });
        }));     
                          
        res.status(200).json({ notifications: notifications});

    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

const sendNotification = async (req, res) => {
    try{
        const {username , userType }= req.userData;
        const { recipientUsername, recipientType , content } = req.body;

        let recipient;
        if(recipientType.toLowerCase() === 'patient')
          recipient = await Patient.findOne({ username: recipientUsername.toLowerCase() });
        if(recipientType.toLowerCase() === 'doctor')
          recipient = await Doctor.findOne({ username: recipientUsername.toLowerCase() });

        if(!recipient)
          throw new Error("This recipient does not exist");

        const notification = {
            sender: {
                username: username,
                userType,
            },
            recipient: {
                username: recipientUsername.toLowerCase(),
                userType: recipientType,
            },
            content: content,
            date: Date.now(),
        }

        const savedNotification = await Notification.create(notification);

        //update recipient
        recipient.notifications.push(savedNotification._id);
        await recipient.save();

        res.status(200).json({ message: "Notification sent successfully!" });

    }catch(error){
        res.status(500).json({ error: error.message });
    }

};

const getLoggedIn = async (req, res) => {
  try {
    const { username, userType } = req.userData;

    let user;

    if (userType.toLowerCase() === 'patient')
      user = await Patient.findOne({ username });

    if (userType.toLowerCase() === 'doctor')
      user = await Doctor.findOne({ username });

    if (userType.toLowerCase() === 'admin')
      user = await Doctor.findOne({ admin });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getNotifications,
  sendNotification,
  getLoggedIn,
};