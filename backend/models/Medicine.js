const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicineSchema = new Schema({
	name: String,
	description: String,
	activeIngredients: [String],
	price: Number,
	quantity: Number,
	image: String, //url
	sales: 
	{
		type:Number,
		default: 0
	},
	medicinalUse: {
		type: String,
		enum: [
			"Antibiotic",
			"Pain Reliever",
			"Antipyretic",
			"Antifungal",
			"Antiviral",
			"Antiseptic",
			"Antispasmodic",
			"Antihistamine",
			"Anti-inflammatory",
			"Diuretic",
		],
	},
});

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
