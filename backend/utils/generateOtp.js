const crypto = require("crypto");
const generateOtp = async () => {
	try {
		let otp = "";
		while (otp.length < 6) {
			const randomByte = crypto.randomBytes(1)[0];
			if (randomByte < 250) {
				otp += (randomByte % 10).toString();
			}
		}
		return otp;
	} catch (error) {
		throw error;
	}
};

module.exports = generateOtp;
