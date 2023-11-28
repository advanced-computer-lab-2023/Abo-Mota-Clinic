const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  content: String,
  sender: {
    type: Schema.Types.ObjectId,
    ref: "ClinicPatient",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  date: Date,
});

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

messageSchema.virtual("formattedDate").get(function () {
  return new Intl.DateTimeFormat("en-US", options).format(this.date);
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
