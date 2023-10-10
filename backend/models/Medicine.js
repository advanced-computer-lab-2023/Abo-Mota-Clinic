const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineSchema = new Schema({
	name: String,
	description: String,
	activeIngredients: [String],
	price: Number,
	quantity: Number,
	image: String, //url
	medicinalUse: String
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
