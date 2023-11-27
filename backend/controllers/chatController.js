const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Message = require("../models/Message");

const getMessages = async (req, res) => {
  try {
    const username = req.userData.username;
    const { recipientId } = req.body;

    let sender;
    sender = await Doctor.findOne({ username });

    if (!sender)
      sender = await Patient.findOne({ username });

    if (!sender)
      throw new Error("This sender does not exist");

    const messages = await Message.find({ sender: sender._id, recipient: recipientId });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const username = req.userData.username;
    const { content, recipientId } = req.body;

    let sender;
    sender = await Doctor.findOne({ username });

    if (!sender)
      sender = await Patient.findOne({ username });

    if (!sender)
      throw new Error("This sender does not exist");

    const message = {
      content,
      sender: sender._id,
      recipient: recipientId,
      // date: Date.now(), 
    }

    await Message.create(message);
    res.status(200).json({ message: "Message sent successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};