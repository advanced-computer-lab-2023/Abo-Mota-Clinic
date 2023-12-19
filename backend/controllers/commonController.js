const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Pharmacist = require("../models/Pharmacist");
const Admin = require("../models/ClinicAdmin");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const Conversation = require("../models/Conversation");

const getMessages = async (req, res) => {
  try {
    const username = req.userData.username;
    const userType = req.userData.userType;
    const contact = req.query.contact;

    let user;

    if (userType.toLowerCase() === "doctor") user = await Doctor.findOne({ username });
    if (userType.toLowerCase() === "patient") user = await Patient.findOne({ username });

    const conversation = await Conversation.findOne({
      participants: {
        $all: [user._id, contact]
      }
    });

    if (!conversation) return res.status(200).json({ messages: [] });

    const messages = await Promise.all(
      conversation.messages.map(messageId =>
        Message.findById(messageId).exec()
      )
    );

    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const username = req.userData.username;
    const userType = req.userData.userType;
    const { content, recipient, date } = req.body;

    let sender;

    if (userType.toLowerCase() === "doctor") sender = await Doctor.findOne({ username });
    if (userType.toLowerCase() === "patient") sender = await Patient.findOne({ username });

    const message = {
      content,
      sender: sender._id,
      recipient: recipient,
      date,
    };

    // Save the message
    const savedMessage = await Message.create(message);

    let conversation = await Conversation.findOne({
      participants: { $all: [sender._id, recipient] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender._id, recipient],
        messages: [savedMessage._id],
        lastMessage: savedMessage._id,
        lastRead: {
          [sender._id]: savedMessage._id,
          [recipient]: null,
        }

      });
    } else {
      // If it exists, add the new message to the conversation
      conversation.messages.push(savedMessage._id);
      conversation.lastMessage = savedMessage._id;
      conversation.lastRead.set(sender._id, savedMessage._id);
      await conversation.save();
    }

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { username, userType } = req.userData;

    let user;
    if (userType.toLowerCase() === "patient") user = await Patient.findOne({ username });
    if (userType.toLowerCase() === "doctor") user = await Doctor.findOne({ username });

    const notifications = await Promise.all(
      user.notifications.map(async (notificationId) => {
        return await Notification.findOne({ _id: notificationId });
      })
    );

    res.status(200).json({ notifications: notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendEmailNotif = async (req, res) => {
  try {
    const { OTP_SENDER_MAIL } = process.env;
    const { email, subject, text } = req.body;

    const mailOptions = {
      from: OTP_SENDER_MAIL,
      to: email,
      subject: subject,
      text: text,
    };

    await sendEmail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
  }
};

const sendNotification = async (req, res) => {
  try {
    const { username, userType } = req.userData;
    const { recipientUsername, recipientType, content } = req.body;

    let recipient;
    if (recipientType.toLowerCase() === "patient")
      recipient = await Patient.findOne({ username: recipientUsername.toLowerCase() });
    if (recipientType.toLowerCase() === "doctor")
      recipient = await Doctor.findOne({ username: recipientUsername.toLowerCase() });

    if (!recipient) throw new Error("This recipient does not exist");

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
    };

    const savedNotification = await Notification.create(notification);

    //update recipient
    recipient.notifications.push(savedNotification._id);
    await recipient.save();

    res.status(200).json({ message: "Notification sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLoggedIn = async (req, res) => {
  try {
    const { username, userType } = req.userData;

    let user;

    if (userType.toLowerCase() === "patient") user = await Patient.findOne({ username });

    if (userType.toLowerCase() === "doctor") user = await Doctor.findOne({ username });

    if (userType.toLowerCase() === 'admin')
      user = await Admin.findOne({ username });

    res.status(200).json({ ...user._doc, userType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContact = async (req, res) => {
  try {
    const { userType } = req.userData;
    const { contact } = req.query;
    let contactType;

    let user;

    if (userType.toLowerCase() === 'patient') {
      user = await Doctor.findOne({ _id: contact });
      contactType = 'doctor';
    }

    if (userType.toLowerCase() === 'doctor') {
      // Search in Pharmacist collection
      user = await Pharmacist.findOne({ _id: contact });
      contactType = 'pharmacist';

      // If not found, search in Patient collection
      if (!user) {
        user = await Patient.findOne({ _id: contact });
        contactType = 'patient';
      }
    }

    res.status(200).json({
      ...user._doc,
      userType: contactType,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContactedUsers = async (req, res) => {
  try {
    // Extracting user information from request
    const username = req.userData.username;
    const userType = req.userData.userType;

    // Determining the collection based on user type
    const sameCollection = userType.toLowerCase() === 'patient' ? Patient : Doctor;
    const oppositeCollections = userType.toLowerCase() === 'patient' ? [Doctor] : [Patient, Pharmacist];

    // Finding the logged-in user
    let loggedIn = await sameCollection.findOne({ username });

    // Fetching conversations where the logged-in user is a participant
    const conversations = await Conversation.find({ participants: loggedIn._id });

    // Using a Set to store unique contact IDs
    let details = [];
    conversations.forEach(conversation => {
      conversation.participants.forEach(participant => {
        // Avoid adding the logged-in user's ID to the contact list
        if (!participant.equals(loggedIn._id)) {
          const read = conversation.lastRead.get(loggedIn._id) &&
            conversation.lastRead.get(loggedIn._id).toString() === conversation.lastMessage.toString();

          details.push({
            contactId: participant.toString(),
            messageId: conversation.lastMessage,
            conversation: conversation._id,
            read
          });
        }
      });
    });

    // Map for user types to handle different collections
    const userTypeMap = {
      pharmacypatient: 'patient',
      clinicpatient: 'patient',
      pharmacist: 'pharmacist',
      doctor: 'doctor',
    };

    // Asynchronously mapping each contact ID to their details and latest message
    const populatedDetails = await Promise.all(details.map(async (detail) => {
      let contactDetails;
      let userType;

      // Extracting contact ID and latest message ID
      const { contactId, messageId, read, conversation } = detail;

      // Searching for contact in the respective collections
      for (const collection of oppositeCollections) {
        contactDetails = await collection.findById(contactId).lean();
        if (contactDetails) {
          userType = collection.modelName.toLowerCase();
          break; // Break the loop once the contact is found
        }
      }

      // Fetching the latest message exchanged with the contact
      const latestMessage = await Message.findOne({ _id: messageId }).lean();

      userType = userTypeMap[userType];

      return {
        contact: { ...contactDetails, userType },
        message: latestMessage,
        conversation,
        read,
      };
    }));

    res.status(200).json(populatedDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const nil = async (req, res) => {
  res.status(200).json("You just wasted everyone's itme");
};

const getUser = async (req, res) => {
  try {
    const { id } = req.query;
    let user = await Doctor.findOne({ _id: id });
    if (!user) {
      user = await Patient.findOne({ _id: id });
    }
    if (!user) return res.status(400).json({ message: "User not found" });

    return res.status(200).json({ name: user.name, username: user.username });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const readMessage = async (req, res) => {
  try {
    const { contact } = req.body;
    const { username, userType } = req.userData;

    const user = userType.toLowerCase() === 'patient'
      ? await Patient.findOne({ username })
      : await Doctor.findOne({ username });


    const conversation = await Conversation.findOne({
      participants: {
        $all: [user._id, contact]
      }
    });

    conversation.lastRead.set(user._id.toString(), conversation.lastMessage);
    conversation.markModified('lastRead');
    await conversation.save();

    res.status(200).json({ message: "Message read successfully!" });
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
  getContact,
  getContactedUsers,
  nil,
  getUser,
  readMessage,
};
