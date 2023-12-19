const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [{
    type: Schema.Types.ObjectId,
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  lastRead: {
    type: Map,
    of: Schema.Types.ObjectId
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
