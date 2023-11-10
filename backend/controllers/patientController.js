const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const HealthPackage = require("../models/HealthPackage");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getPatient = async (req, res) => {
	try {
		const username = req.userData.username;
		const patient = await Patient.findOne({ username }).populate("healthPackage.package");
		res.status(200).json(patient);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all patient prescriptions
const getPrescriptions = async (req, res) => {
	try {
		// const patient = await Patient.findOne({}).populate({
		//   path: "prescriptions",
		//   populate: [
		//     {
		//       path: "medicines",
		//       model: "Medicine",
		//     },
		//     {
		//       path: "doctor",
		//       model: "Doctor",
		//     },
		//   ],
		// });
		// res.status(200).json(patient.prescriptions);
		const username = req.userData.username;
		const { _id } = await Patient.findOne({ username });
		const prescriptions = await Prescription.find({ patient: _id }).populate([
			{
				path: "medicines.medicine",
				model: "Medicine",
			},
			{
				path: "doctor",
				model: "Doctor",
			},
		]);
		res.status(200).json(prescriptions);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all patient's registered family members
const getFamilyMembers = async (req, res) => {
	try {
		const username = req.userData.username;

		// ???
		const patient = await Patient.findOne({ username });
		// .populate("familyMembers._id");
		// ???
		res.status(200).json(patient.familyMembers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Add a patient's family member
const addFamilyMember = async (req, res) => {
	try {
		const {
			name,
			nationalId,
			age,
			gender,
			relationToPatient,
			phoneNumber,
			username,
			password,
			dob,
		} = req.body;

		const familyMemExists = await Patient.findOne({
			$or: [{ username }, { email }, { nationalId }, { mobile: phoneNumber }],
		});

		if (familyMemExists) {
			throw Error("A user with these credentials already exists");
		}
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		let relation;
		if (relationToPatient === "husband") {
			relation = "wife";
		} else if (relationToPatient === "wife") {
			relation = "husband";
		} else if (relationToPatient === "child") {
			relation = "parent";
		} else throw Error("Relation is limited husband, wife or child");

		const addedFamilyMember = await Patient.create({
			name,
			nationalId,
			age,
			gender,
			linkedFamily: [
				{
					member: loggedIn._id,
					relationToPatient: relation,
				},
			],
			mobile: phoneNumber,
			username: username.toLowerCase(),
			password: hashedPassword,
			dob,
		});

		const loggedInUsername = req.userData.username;
		const linkedFamilyMember = {
			member: addedFamilyMember._id,
			relationToPatient: relationToPatient,
		};
		const updated = await Patient.updateOne(
			{ loggedInUsername },
			{ $push: { linkedFamily: linkedFamilyMember } }
		);
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
	// const familyMember = await Patient.findOne({ nationalId: nationalId });
	// loggedIn.familyMembers.push({
	// 	_id: familyMember._id,
	// 	relationToPatient: relationToPatient,
	// });
	// const updated = await Patient.updateOne(
	// 	{ _id: loggedIn._id },
	// 	{ familyMembers: loggedIn.familyMembers }
	// );
};

// Get all doctors
const getDoctors = async (req, res) => {
	try {
		const doctors = await Doctor.find({ registrationStatus: "approved" }).select("-password");
		const doctorsWithAppointments = await Promise.all(
			doctors.map(async (doctor) => {
				const appointments = await Appointment.find({ doctor: doctor._id, status: "unbooked" });
				return { ...doctor._doc, appointments };
			})
		);
		res.status(200).json(doctorsWithAppointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all appointments
const getAppointments = async (req, res) => {
	try {
		// const patient = await Patient.findOne({}).populate({
		//   path: "appointments",
		//   populate: {
		//     path: "doctor",
		//     model: "Doctor",
		//   },
		// });
		// res.status(200).json(patient.appointments);
		const username = req.userData.username;
		const { _id } = await Patient.findOne({ username });
		const appointments = await Appointment.find({ patient: _id }).populate("doctor");
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const uploadMedicalHistory = async (req, res) => {
	try{
		// const fileName = req.files.medicalHistory[0].originalname;
		console.log(req.files);
		const medicalHistory = {
			data: req.files.medicalHistory[0].buffer,
			contentType: req.files.medicalHistory[0].mimetype,
		};
		console.log(medicalHistory);
		const username = req.userData.username;
		console.log(username);
		const patient = await Patient.findOne({ username });
		const updated = await Patient.updateOne(
			{ username },
			{ medicalHistory: [...patient.medicalHistory, medicalHistory] }
		);
		res.status(200).json(updated);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
	
}

const deleteMedicalHistory = async (req, res) => {
	try {
	  const username = req.userData.username;
	  const recordId = req.params.recordId;
  
	  const patient = await Patient.findOne({ username });
  
	  patient.medicalHistory.splice(recordId, 1);
  
	  await patient.save();
  
	  res.status(200).json(patient);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  };
  

const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body;
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN PATIENT ** DONE
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });
		// ** REPLACE THIS LINE WITH LOGIC TO FIND CURRENTLY LOGGED IN PATIENT **

		const isMatch = await bcrypt.compare(oldPassword, loggedIn.password);
		if (!isMatch) {
			throw new Error("Old Password is incorrect");
		}
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
		const updatedUser = await Patient.updateOne(
			{ _id: loggedIn._id },
			{ password: hashedPassword }
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPackages = async (req, res) => {
	try {
		const filter = { isActivated: true };
		const packages = await HealthPackage.find(filter);
		res.status(200).json(packages);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAvailableAppointments = async (req, res) => {
	try {
		const { doctorId } = req.query;
		console.log(doctorId);
		if (!doctorId) {
			throw Error("Input a doctor ID");
		}
		if (!(await Doctor.findOne({ _id: doctorId }))) {
			throw Error("Doctor doesn't exist");
		}
		// Add milliseconds to Date.now if we want to change the starting range of appointments
		const currentDate = new Date(Date.now());
		const filter = {
			$and: [
				{ doctor: doctorId, status: "unbooked" },
				{
					$or: [{ patient: { $exists: false } }, { patient: null }],
				},
				{ date: { $gt: currentDate } },
			],
		};
		const appointments = await Appointment.find(filter);
		res.status(200).json(appointments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const linkFamilyMember = async (req, res) => {
	try {
		const { email, mobile, relationToPatient } = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });
		let membersRelation = "";

		if (!email && !mobile) {
			throw Error("Input an Email or Mobile No.");
		}
		if (email && mobile) {
			throw Error("Input either a phone no. or an email address");
		}
		if (!relationToPatient) {
			throw Error("Input a relation to the patient");
		}
		if (
			relationToPatient !== "child" &&
			relationToPatient !== "husband" &&
			relationToPatient !== "wife"
		) {
			throw Error("Relation is restricted to husband, wife or child");
		}

		// Determining family member's relation to the logged in user from family member's POV
		if (relationToPatient === "husband") {
			membersRelation = "wife";
		} else if (relationToPatient === "wife") {
			membersRelation = "husband";
		} else membersRelation = "parent";

		if (email) {
			const memberAccount = await Patient.findOne({ email });
			if (!memberAccount) {
				throw Error("This email does not belong to a registered user");
			}

			const query = {
				linkedFamily: {
					$elemMatch: { member: memberAccount._id },
				},
			};
			const memberAlreadyLinked = await Patient.findOne(query);
			if (memberAlreadyLinked) {
				throw Error("You have already linked this family member");
			}

			const newMember = {
				member: memberAccount._id,
				relationToPatient,
			};
			const updated = await Patient.updateOne({ username }, { $push: { linkedFamily: newMember } });

			const oppositeMember = {
				member: loggedIn._id,
				relationToPatient: membersRelation,
			};
			const updatedOpposite = await Patient.updateOne(
				{ _id: memberAccount._id },
				{ $push: { linkedFamily: oppositeMember } }
			);
			return res.status(200).json({ updated });
		} else if (mobile) {
			const memberAccount = await Patient.findOne({ mobile });
			if (!memberAccount) {
				throw Error("This email does not belong to a registered user");
			}

			const query = {
				linkedFamily: {
					$elemMatch: { member: memberAccount._id },
				},
			};
			const memberAlreadyLinked = await Patient.findOne(query);
			if (memberAlreadyLinked) {
				throw Error("You have already linked this family member");
			}

			const newMember = {
				member: memberAccount._id,
				relationToPatient,
			};
			const updated = await Patient.updateOne({ username }, { $push: { linkedFamily: newMember } });

			const oppositeMember = {
				member: loggedIn._id,
				relationToPatient: membersRelation,
			};
			const updatedOpposite = await Patient.updateOne(
				{ _id: memberAccount._id },
				{ $push: { linkedFamily: oppositeMember } }
			);
			return res.status(200).json({ updated });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
// Helpers for self subscription controllers
const selfSubscribeWallet = async (user, package) => {
	try {
		const price = package.pricePerYear;
		const familyDiscount = user.familyDiscount;
		const discountedPrice = price * (1 - familyDiscount);
		// Check if user has required funds
		if (user.wallet >= discountedPrice) {
			await Patient.updateOne({ _id: user._id }, { wallet: user.wallet - discountedPrice });
		} else {
			throw new Error("You don't have enough funds in your wallet for this subscription");
		}

		let dateInYear = new Date();
		dateInYear.setFullYear(dateInYear.getFullYear() + 1);
		const newPackage = {
			status: "subscribed",
			package: package._id,
			endDate: dateInYear,
		};
		// Finding updating all family members' family discount when their discount is less than the incoming one
		const familyMemberIds = await user.linkedFamily.map((familyLink) => familyLink.member);
		const updatedFamilyMembers = await Patient.updateMany(
			{
				_id: { $in: familyMemberIds },
				$or: [
					{ familyDiscount: { $lt: package.familyDiscount } },
					{ familyDiscount: { $exists: false } }, // Handle undefined familyDiscount
				],
			},
			{ $set: { familyDiscount: package.familyDiscount } }
		);

		const subscribedUser = await Patient.updateOne(
			{ _id: user._id },
			{ healthPackage: newPackage }
		);
		return subscribedUser;
	} catch (error) {
		throw error;
	}
};
const selfSubscribeCard = async () => { };

// Helpers for family subscription controllers
const familySubscribeWallet = async (receiver, subscriber, package) => {
	try {
		const price = package.pricePerYear;
		const familyDiscount = receiver.familyDiscount;
		const discountedPrice = price * (1 - familyDiscount);
		// Check if user has required funds
		if (subscriber.wallet >= discountedPrice) {
			await Patient.updateOne(
				{ _id: subscriber._id },
				{ wallet: subscriber.wallet - discountedPrice }
			);
		} else throw new Error("You don't have enough funds in your wallet for this subscription");

		let dateInYear = new Date();
		dateInYear.setFullYear(dateInYear.getFullYear() + 1);
		const newPackage = {
			status: "subscribed",
			package: package._id,
			endDate: dateInYear,
		};
		// Finding updating all family members' family discount when their discount is less than the incoming one
		const familyMemberIds = await receiver.linkedFamily.map((familyLink) => familyLink.member);
		const updatedFamilyMembers = await Patient.updateMany(
			{
				_id: { $in: familyMemberIds },
				$or: [
					{ familyDiscount: { $lt: package.familyDiscount } },
					{ familyDiscount: { $exists: false } }, // Handle undefined familyDiscount
				],
			},
			{ $set: { familyDiscount: package.familyDiscount } }
		);

		const subscribedUser = await Patient.updateOne(
			{ _id: receiver._id },
			{ healthPackage: newPackage }
		);
		return subscribedUser;
	} catch (error) {
		throw error;
	}
};
const familySubscribeCard = async () => { };

// Controllers for Subscription
const subscribeForMyself = async (req, res) => {
	try {
		const { _id, paymentType } = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });

		if (!_id || !paymentType) {
			throw Error("Please input package ID and payment type");
		}

		if (loggedIn.healthPackage.package !== null || loggedIn.healthPackage.status !== "cancelled") {
			throw Error("You already have an active package");
		}

		if (paymentType.toLowerCase() !== "wallet" && paymentType.toLowerCase() !== "card") {
			throw Error("Payment is limited to card or wallet");
		}

		const package = await HealthPackage.findOne({ _id });
		if (!package || !package.isActivated) {
			throw Error("Package does not exist");
		}
		// if (loggedIn.healthPackage.status === "cancelled") {
		// 	const updatedPackage = {
		// 		status: null,
		// 		package: null,

		// 	}
		// 	Patient.updateOne({ username }, { });
		// }
		if (paymentType.toLowerCase() === "wallet") {
			const subscribedUser = await selfSubscribeWallet(loggedIn, package);
			res.status(200).json(subscribedUser);
		} else if (paymentType.toLowerCase() === "card") {
			// KORD MUST IMPLEMENT FUNCTION FOR STRIPE PAYMENT
			selfSubscribeCard();
			// KORD MUST IMPLEMENT FUNCTION FOR STRIPE PAYMENT
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const subscribeForFamily = async (req, res) => {
	try {
		const { _id, memberId, paymentType } = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });
		const familyMember = await Patient.findOne({ _id: memberId });

		if (!_id || !memberId || !paymentType) {
			throw Error("Please input memberId, package ID and payment type");
		}

		if (!familyMember) {
			throw Error("This patient is not a family member");
		}

		if (paymentType.toLowerCase() !== "wallet" && paymentType.toLowerCase() !== "card") {
			throw Error("Payment is limited to card or wallet");
		}

		if (familyMember.healthPackage.package !== null) {
			throw Error("Your family member is already subscribed to a package");
		}

		const package = await HealthPackage.findOne({ _id });
		if (!package || !package.isActivated) {
			throw Error("Package does not exist");
		}
		if (paymentType.toLowerCase() === "wallet") {
			const subscribedFamilyMember = await familySubscribeWallet(familyMember, loggedIn, package);
			res.status(200).json(subscribedFamilyMember);
		} else if (paymentType.toLowerCase() === "card") {
			// KORD MUST IMPLEMENT FUNCTION FOR STRIPE PAYMENT
			familySubscribeCard();
			// KORD MUST IMPLEMENT FUNCTION FOR STRIPE PAYMENT
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getMyPackage = async (req, res) => {
	try {
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username }).populate("healthPackage.package");
		if (!loggedIn.healthPackage.package) {
			throw Error("You are not subscribed to any packages");
		}
		const result = {
			package: loggedIn.healthPackage.package,
			expiryDate: loggedIn.healthPackage.endDate,
		};
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getFamilyPackages = async (req, res) => {
	try {
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });
		if (loggedIn.linkedFamily.length === 0) {
			throw Error("You have no registered family members");
		}
		const familyMemberIds = loggedIn.linkedFamily.map((familyLink) => familyLink.member);
		const familyMembers = await Patient.find({
			_id: { $in: familyMemberIds },
		}).populate("healthPackage.package");
		const familyPackageArray = familyMembers.map((member) => {
			const endDate = member.healthPackage?.endDate;
			return {
				name: member.username,
				package: member.healthPackage.package,
				expiryDate: endDate || "N/A",
			};
		});
		res.status(200).json(familyPackageArray);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const payAppointmentByCard = async (req, res) => {
	try {
		const { doctor_id, deductible, credit } = req.body;
	try {
		const { doctor_id, deductible, credit } = req.body;

		// Update the doctor's wallet by the provided amount
		const updatedDoctor = await Doctor.findByIdAndUpdate(
			doctor_id,
			{ $inc: { wallet: parseFloat(credit) } },
			{ new: true }
		);
		// Update the doctor's wallet by the provided amount
		const updatedDoctor = await Doctor.findByIdAndUpdate(
			doctor_id,
			{ $inc: { wallet: parseFloat(credit) } },
			{ new: true }
		);

		if (!updatedDoctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}

		res.json({ message: "Doctor wallet updated successfully", doctor: updatedDoctor });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const payAppointmentByWallet = async (req, res) => {
	try {
		const { doctor_id, deductible, credit } = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });
	try {
		const { doctor_id, deductible, credit } = req.body;
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });

		console.log("Logged in user")
		console.log(loggedIn);

		if (loggedIn.wallet < deductible) {
			return res.status(500).json({ message: 'Insufficient funds' });
		}

		const updatedPatient = await Patient.findByIdAndUpdate(
			loggedIn._id,
			{ $inc: { wallet: -deductible } },
			{ new: true }
		);

		const updatedDoctor = await Doctor.findByIdAndUpdate(
			doctor_id,
			{ $inc: { wallet: credit } },
			{ new: true }
		);

		res.json({ message: "Payment is successful", patient: updatedPatient, doctor: updatedDoctor });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const viewWallet = async (req, res) => {
	try {
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });

		res.status(200).json({ wallet: loggedIn.wallet });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

function calculateUnusedMonths(renewalDate, cancelDate) {
	if (cancelDate >= renewalDate) {
		return 0;
	}

	let monthsDiff = (renewalDate.getFullYear() - cancelDate.getFullYear()) * 12;
	monthsDiff -= cancelDate.getMonth();
	monthsDiff += renewalDate.getMonth();

	// Check if the difference is less than a month
	if (monthsDiff <= 0 || renewalDate - cancelDate < 1000 * 60 * 60 * 24 * 30) {
		return 0;
	}

	return monthsDiff;
}

const selfCancelSubscription = async (req, res) => {
	try {
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username }).populate("healthPackage.package");

		if (loggedIn.healthPackage.status === "cancelled" || !loggedIn.healthPackage.status) {
			throw Error("You don't have an active subscription");
		}
		const cancelDate = new Date();
		const result = {
			status: "cancelled",
			package: null,
			endDate: loggedIn.healthPackage.endDate,
			cancelDate,
		};
		const unusedMonths = calculateUnusedMonths(loggedIn.healthPackage.endDate, cancelDate);
		const pricePerMonth = loggedIn.healthPackage.package.pricePerYear / 12;
		const refund = pricePerMonth * unusedMonths;
		const cancel = await Patient.updateOne(
			{ username },
			{ healthPackage: result, wallet: loggedIn.wallet + refund }
		);
		const familyMemberIds = loggedIn.linkedFamily.map((familyLink) => familyLink.member);
		const removeFamilyDiscounts = await Patient.updateMany(
			{
				_id: { $in: familyMemberIds },
			},
			{ $set: { familyDiscount: 0 } }
		);

		for (const memberId of familyMemberIds) {
			const member = await Patient.findOne({ _id: memberId }).populate([
				"linkedFamily.member",
				"healthPackage.package",
			]);

			// Check if there are other family members and at least one of them has an active package
			let maxDiscount = 0;
			member.linkedFamily.forEach((link) => {
				const meetsCondition =
					link.member._id !== loggedIn._id && // Exclude the currently logged-in user
					(link.member.halthPackage.status === "subscribed" ||
						link.member.healthPackage.status === "unsubscribed");
				if (meetsCondition) {
					maxDiscount = Math.max(maxDiscount, link.member.healthPackage.package.familyDiscount);
				}
			});

			const updatedMember = await Patient.updateOne(
				{ _id: member._id },
				{ $set: { familyDiscount: maxDiscount } }
			);
		}
		res.status(200).json(cancel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const familyCancelSubscription = async (req, res) => {
	try {
		const { familyMemberUsername } = req.body;
		const familyMember = await Patient.findOne({ username: familyMemberUsername }).populate(
			"healthPackage.package"
		);
		if (!familyMember) {
			throw Error("This family member does not exist");
		}

		if (familyMember.healthPackage.status === "cancelled" || !familyMember.healthPackage.status) {
			throw Error("Your family member doesn't have an active subscription");
		}
		const cancelDate = new Date();
		const result = {
			status: "cancelled",
			package: null,
			endDate: familyMember.healthPackage.endDate,
			cancelDate,
		};
		const unusedMonths = calculateUnusedMonths(familyMember.healthPackage.endDate, cancelDate);
		const pricePerMonth = familyMember.healthPackage.package.pricePerYear / 12;
		const refund = pricePerMonth * unusedMonths;
		const cancel = await Patient.updateOne(
			{ username: familyMemberUsername },
			{ healthPackage: result, wallet: familyMember.wallet + refund }
		);
		const familyMemberIds = familyMember.linkedFamily.map((familyLink) => familyLink.member);
		const removeFamilyDiscounts = await Patient.updateMany(
			{
				_id: { $in: familyMemberIds },
			},
			{ $set: { familyDiscount: 0 } }
		);

		for (const memberId of familyMemberIds) {
			const member = await Patient.findOne({ _id: memberId }).populate([
				"linkedFamily.member",
				"healthPackage.package",
			]);

			// Check if there are other family members and at least one of them has an active package
			let maxDiscount = 0;
			member.linkedFamily.forEach((link) => {
				const meetsCondition =
					link.member._id !== familyMember._id && // Exclude the currently logged-in user
					(link.member.halthPackage.status === "subscribed" ||
						link.member.healthPackage.status === "unsubscribed");
				if (meetsCondition) {
					maxDiscount = Math.max(maxDiscount, link.member.healthPackage.package.familyDiscount);
				}
			});

			const updatedMember = await Patient.updateOne(
				{ _id: member._id },
				{ $set: { familyDiscount: maxDiscount } }
			);
		}
		res.status(200).json(cancel);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const packageUnsubscribe = async (req, res) => {
	try {
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username }).populate("healthPackage.package");

		if (!loggedIn.healthPackage.package || loggedIn.healthPackage.package !== "subscribed") {
			throw Error("You are not subscribed to any package");
		}
		const currentDate = new Date();
		const result = {
			status: "unsubscribed",
			package: null,
			endDate: loggedIn.healthPackage.endDate,
			cancelDate: null,
			unsubscribeDate: currentDate,
		};
		const unsubscribed = await Patient.updateOne({ username }, { healthPackage: result });
		res.status(200).json(unsubscribed);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const viewMyPackageStatus = async (req, res) => {
	try {
		const username = req.userData.username;
		const loggedIn = await Patient.findOne({ username });
		let result;

		if (loggedIn.healthPackage.status === "subscribed") {
			result = {
				status: loggedIn.healthPackage.status,
				renewalDate: loggedIn.healthPackage.endDate,
			};
		} else if (loggedIn.healthPackage.status === "unsubscribed") {
			result = {
				status: loggedIn.healthPackage.status,
				unsubscribeDate: loggedIn.healthPackage.unsubscribeDate,
			};
		} else if (loggedIn.healthPackage.status === "cancelled") {
			result = {
				status: loggedIn.healthPackage.status,
				cancelDate: loggedIn.healthPackage.cancelDate,
			};
		} else if (!loggedIn.healthPackage.status) {
			result = {
				status: "No subscription",
			};
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const viewFamilyPackageStatus = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const test = async (req, res) => {
	const { mode } = req.body;

	if (mode === "success") {
		res.status(200).json({ message: "success" });
	} else {
		throw new Error("Insufficient funds");
	}

}

module.exports = {
	getPatient,
	getPrescriptions,
	getFamilyMembers,
	addFamilyMember,
	getDoctors,
	getAppointments,
	changePassword,
	getPackages,
	getAvailableAppointments,
	linkFamilyMember,
	subscribeForFamily,
	subscribeForMyself,
	getMyPackage,
	getFamilyPackages,
	payAppointmentByCard,
	payAppointmentByWallet,
	viewWallet,
	selfCancelSubscription,
	familyCancelSubscription,
	viewMyPackageStatus,
	viewFamilyPackageStatus,
	packageUnsubscribe,
  	payAppointmentByCard,
  	payAppointmentByWallet,
	viewWallet,
	uploadMedicalHistory,
	deleteMedicalHistory,
	test
};
