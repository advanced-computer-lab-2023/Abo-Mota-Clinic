const nodemailer = require("nodemailer");
const { OTP_SENDER_MAIL, OTP_SENDER_PASS } = process.env;

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: OTP_SENDER_MAIL,
		pass: OTP_SENDER_PASS,
	},
});

// test transporter
transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Ready for messages");
		console.log(success);
	}
});

const sendEmail = async (mailOptions) => {
	try {
		await transporter.sendMail(mailOptions);
		return;
	} catch (error) {
		throw error;
	}
};

module.exports = sendEmail;
