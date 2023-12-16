const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  content: String,
  sender: {
    username: String,
    userType: String,
  },
  recipient: {
    username: String,
    userType: String,
  },
  date: Date,
},
{ toJSON: { virtuals: true } }
);

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

notificationSchema.virtual("formattedDate").get(function () {
  return new Intl.DateTimeFormat("en-US", options).format(this.date);
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
