const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");

const getMessages = async (req, res) => {
  try {
    const username = req.userData.username;
    const userType = req.userData.userType;
    const recipient = req.query.recipient;

    let sender;

    if (userType.toLowerCase() === 'doctor')
      sender = await Doctor.findOne({ username });
    if (userType.toLowerCase() === 'patient')
      sender = await Patient.findOne({ username });

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
    const userType = req.userData.userType;
    const { content, recipient } = req.body;

    let sender;

    if (userType.toLowerCase() === 'doctor')
      sender = await Doctor.findOne({ username });
    if (userType.toLowerCase() === 'patient')
      sender = await Patient.findOne({ username });

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

const sendEmailNotif = async (req, res) => {
  try{
    const { OTP_SENDER_MAIL } = process.env;
	  const { email, subject, text } = req.body;
    
	  const mailOptions = {
	    from: OTP_SENDER_MAIL,
	    to: email,
	    subject: subject,
	    text: text,
	  };

    await sendEmail(mailOptions);
		res.status(200).send('Email sent successfully');
  } catch(error){
    console.error(error);
  }
}

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
      user = await Doctor.findOne({ username });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipient = async (req, res) => {
  try {
    const { userType } = req.userData;
    const { recipientId } = req.query;

    let user;
    if (userType.toLowerCase() === 'patient')
      user = await Doctor.findOne({ _id: recipientId });
    if (userType.toLowerCase() === 'doctor')
      user = await Patient.findOne({ _id: recipientId });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (userIds, collection) => {
  const users = await Promise.all(userIds.map(async (userId) => {
    return await collection.findById(userId).lean();
  }));

  return users;
}


const getContactedUsers = async (req, res) => {
  try {
    const username = req.userData.username;
    const userType = req.userData.userType;

    const sameCollection = userType.toLowerCase() === 'patient' ? Patient : Doctor;
    const oppositeCollection = userType.toLowerCase() === 'patient' ? Doctor : Patient;

    const sender = await sameCollection.findOne({ username });

    const sentMessages = await Message.find({ sender: sender._id });
    const receivedMessages = await Message.find({ recipient: sender._id });

    // duplicate-free contacted users
    const recipientIds = [...new Set(sentMessages.map(message => message.recipient.toString()))];
    const senderIds = [...new Set(receivedMessages.map(message => message.sender.toString()))];
    const contactedUserIds = [...new Set([...recipientIds, ...senderIds])];

    const contactedUsers = await getUserDetails(contactedUserIds, oppositeCollection);

    res.status(200).json(contactedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  sendMessage,
  getMessages,
  sendEmailNotif,
  getNotifications,
  sendNotification,
  getLoggedIn,
  getRecipient,
  getContactedUsers
};