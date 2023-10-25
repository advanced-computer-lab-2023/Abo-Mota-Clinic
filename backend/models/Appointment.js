const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    date: Date,
    status: {
      type: String,
      enum: ["completed", "upcoming", "cancelled", "unbooked"],
      default: "unbooked",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "ClinicPatient",
    },
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

appointmentSchema.virtual("formattedDate").get(function () {
  return new Intl.DateTimeFormat("en-US", options).format(this.date);
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
