const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  medicines: [{
    name: String,
    price: Number,
    quantity: Number,
    medicineImage: {
      data: Buffer,
      contentType: String
    }
  }],
  date: Date,
  totalPrice: Number,
  status: {
    type: String,
    enum: ["cancelled", "pending", "completed"],
    default: "pending",
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
},
  {
    toJSON: { virtuals: true }
  });

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

orderSchema.virtual("formattedDate").get(function () {
  return new Intl.DateTimeFormat("en-US", options).format(this.date);
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
