const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const HealthPackage = require("../models/HealthPackage");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("mongoose");

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
    const patient = await Patient.findOne({ username }).populate("linkedFamily.member");
    const familyMembersWithRelation = patient.linkedFamily.map((familyLink) => {
      return {
        ...familyLink.member._doc, // Spread the member's data
        relationToPatient: familyLink.relationToPatient, // Add the relation to patient
      };
    });
    // const familyMembersWithRelation = patient.linkedFamily.map((familyLink) => {
    // 	return {
    // 		...familyLink.member, // Spread the member's data
    // 		relationToPatient: familyLink.relationToPatient, // Add the relation to patient
    // 	};
    // });
    // .populate("familyMembers._id");
    // ???
    res.status(200).json(familyMembersWithRelation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a patient's family member
const addFamilyMember = async (req, res) => {
  try {
    const {
      name,
      email,
      nationalId,
      age,
      gender,
      relationToPatient,
      phoneNumber,
      username,
      password,
      dob,
    } = req.body;

    const loggedInUsername = req.userData.username;
    const loggedIn = await Patient.findOne({ username: loggedInUsername });
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
      email,
      password: hashedPassword,
      dob,
      emergencyContact: {
        name: loggedIn.name,
        mobile: loggedIn.mobile,
        relationToPatient: relation,
      },
    });

    const linkedFamilyMember = {
      member: addedFamilyMember._id,
      relationToPatient: relationToPatient,
    };
    const updated = await Patient.updateOne(
      { username: loggedInUsername },
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
    const doctors = await Doctor.find({
      registrationStatus: "approved",
      contractApproved: true,
    }).select("-password");
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
    const username = req.userData.username;
    const { _id } = await Patient.findOne({ username });
    const appointments = await Appointment.find({ patient: _id }).populate("doctor");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadMedicalHistory = async (req, res) => {
  try {
    // console.log(req.files.medicalHistory[0]);
    const medicalHistory = {
      data: req.files.medicalHistory[0].buffer,
      contentType: req.files.medicalHistory[0].mimetype,
      fileName: req.files.medicalHistory[0].originalname,
    };
    const username = req.userData.username;
    const patient = await Patient.findOne({ username });
    const updated = await Patient.updateOne(
      { username },
      { medicalHistory: [...patient.medicalHistory, medicalHistory] }
    );
    console.log(medicalHistory);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMedicalHistory = async (req, res) => {
  try {
    const username = req.userData.username;
    const id = req.params.id;

    const patient = await Patient.findOne({ username });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    patient.medicalHistory = patient.medicalHistory.filter((file) => !objectId.equals(file._id));

    await patient.save();

    res.status(200).json("Record removed");
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

const updateNewlyLinkedFamilyMemberDiscount = async (loggedIn, linkedMember) => {
  let greaterDiscount = 0;
  const isNotLoggedInPackage =
    loggedIn.healthPackage.status === "cancelled" || !loggedIn.healthPackage.status;
  const isNotLinkedMemberPackage =
    linkedMember.healthPackage.status === "cancelled" || !linkedMember.healthPackage.status;
  if (isNotLoggedInPackage && isNotLinkedMemberPackage) {
    return;
  }
  if (isNotLoggedInPackage) {
    greaterDiscount = linkedMember.healthPackage.package.familyDiscount;
    if (loggedIn.familyDiscount < greaterDiscount) {
      const updated = await Patient.updateOne(
        { _id: loggedIn._id },
        { familyDiscount: linkedMember.healthPackage.package.familyDiscount }
      );
    }
    return;
  }
  if (isNotLinkedMemberPackage) {
    greaterDiscount = loggedIn.healthPackage.package.familyDiscount;
    if (linkedMember.familyDiscount < greaterDiscount) {
      const updated = await Patient.updateOne(
        { _id: linkedMember._id },
        { familyDiscount: loggedIn.healthPackage.package.familyDiscount }
      );
    }

    return;
  }
  greaterDiscount = Math.max(
    loggedIn.healthPackage.package.familyDiscount,
    linkedMember.healthPackage.package.familyDiscount
  );

  if (linkedMember.familyDiscount < greaterDiscount) {
    const updated = await Patient.updateOne(
      { _id: linkedMember._id },
      { familyDiscount: greaterDiscount }
    );
  }

  if (loggedIn.familyDiscount < greaterDiscount) {
    const updatedLoggedIn = await Patient.updateOne(
      { _id: loggedIn._id },
      { familyDiscount: greaterDiscount }
    );
  }
};
const linkFamilyMember = async (req, res) => {
  try {
    const { email, mobile, relationToPatient } = req.body;
    const username = req.userData.username;
    const loggedIn = await Patient.findOne({ username }).populate("healthPackage.package");
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

      let newFamilyDiscount;
      if (memberAccount.familyDiscount < loggedIn.healthPackage.package.familyDiscount) {
        newFamilyDiscount = loggedIn.healthPackage.package.familyDiscount;
      } else newFamilyDiscount = memberAccount.familyDiscount;
      const updatedOpposite = await Patient.updateOne(
        { _id: memberAccount._id },
        { $push: { linkedFamily: oppositeMember }, familyDiscount: newFamilyDiscount }
      );
      await updateNewlyLinkedFamilyMemberDiscount(loggedIn, memberAccount);
      return res.status(200).json({ updated });
    } else if (mobile) {
      const memberAccount = await Patient.findOne({ mobile });
      if (!memberAccount) {
        throw Error("This phone number does not belong to a registered user");
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
      await updateNewlyLinkedFamilyMemberDiscount(loggedIn, memberAccount);

      return res.status(200).json({ updated });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helpers for self subscription controllers
// const selfSubscribeWallet = async (user, package) => {
// 	try {
// 		const price = package.pricePerYear;
// 		const familyDiscount = user.familyDiscount;
// 		const discountedPrice = price * (1 - familyDiscount);

// 		// Check if user has required funds
// 		if (user.wallet >= discountedPrice) {
// 			await Patient.updateOne({ _id: user._id }, { wallet: user.wallet - discountedPrice });
// 		} else {
// 			throw new Error("You don't have enough funds in your wallet for this subscription");
// 		}

// 		let dateInYear = new Date();
// 		dateInYear.setFullYear(dateInYear.getFullYear() + 1);
// 		const newPackage = {
// 			status: "subscribed",
// 			package: package._id,
// 			endDate: dateInYear,
// 			pricePaid: discountedPrice,
// 		};
// 		// Finding updating all family members' family discount when their discount is less than the incoming one
// 		const familyMemberIds = await user.linkedFamily.map((familyLink) => familyLink.member);
// 		const updatedFamilyMembers = await Patient.updateMany(
// 			{
// 				_id: { $in: familyMemberIds },
// 				$or: [
// 					{ familyDiscount: { $lt: package.familyDiscount } },
// 					{ familyDiscount: { $exists: false } }, // Handle undefined familyDiscount
// 				],
// 			},
// 			{ $set: { familyDiscount: package.familyDiscount } }
// 		);

// 		const subscribedUser = await Patient.updateOne(
// 			{ _id: user._id },
// 			{ healthPackage: newPackage }
// 		);
// 		return subscribedUser;
// 	} catch (error) {
// 		throw error;
// 	}
// };
// const selfSubscribeCard = async () => { };

// Helpers for family subscription controllers
// const familySubscribeWallet = async (receiver, subscriber, package) => {
// 	try {
// 		const price = package.pricePerYear;
// 		const familyDiscount = receiver.familyDiscount;
// 		const discountedPrice = price * (1 - familyDiscount);
// 		// Check if user has required funds
// 		if (subscriber.wallet >= discountedPrice) {
// 			await Patient.updateOne(
// 				{ _id: subscriber._id },
// 				{ wallet: subscriber.wallet - discountedPrice }
// 			);
// 		} else throw new Error("You don't have enough funds in your wallet for this subscription");

// 		let dateInYear = new Date();
// 		dateInYear.setFullYear(dateInYear.getFullYear() + 1);
// 		const newPackage = {
// 			status: "subscribed",
// 			package: package._id,
// 			endDate: dateInYear,
// 			pricePaid: discountedPrice,
// 		};
// 		// Finding updating all family members' family discount when their discount is less than the incoming one
// 		const familyMemberIds = await receiver.linkedFamily.map((familyLink) => familyLink.member);
// 		const updatedFamilyMembers = await Patient.updateMany(
// 			{
// 				_id: { $in: familyMemberIds },
// 				$or: [
// 					{ familyDiscount: { $lt: package.familyDiscount } },
// 					{ familyDiscount: { $exists: false } }, // Handle undefined familyDiscount
// 				],
// 			},
// 			{ $set: { familyDiscount: package.familyDiscount } }
// 		);

// 		const subscribedUser = await Patient.updateOne(
// 			{ _id: receiver._id },
// 			{ healthPackage: newPackage }
// 		);
// 		return subscribedUser;
// 	} catch (error) {
// 		throw error;
// 	}
// };
// const familySubscribeCard = async () => { };

// Controllers for Subscription
// const subscribeForMyself = async (req, res) => {
// 	try {
// 		const { _id } = req.body;
// 		const username = req.userData.username;
// 		const loggedIn = await Patient.findOne({ username });

// 		if (!_id) {
// 			throw Error("Please input package ID and payment type");
// 		}

// 		if (loggedIn.healthPackage.package !== null || loggedIn.healthPackage.status !== "cancelled") {
// 			throw Error(
// 				"You already have a subscribed package or remaining benefits from an unsubscribed package"
// 			);
// 		}

// 		const package = await HealthPackage.findOne({ _id });
// 		if (!package || !package.isActivated) {
// 			throw Error("Package does not exist");
// 		}
// 		// if (loggedIn.healthPackage.status === "cancelled") {
// 		// 	const updatedPackage = {
// 		// 		status: null,
// 		// 		package: null,

// 		// 	}
// 		// 	Patient.updateOne({ username }, { });
// 		// }

// 		await subscribe(loggedIn, loggedIn, package);
// 		res.status(200).json({ message: "Subscribed successfully" });

// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

const subscribe = async (receiver, package) => {
  let dateInYear = new Date();
  dateInYear.setFullYear(dateInYear.getFullYear() + 1);
  const newPackage = {
    status: "subscribed",
    package: package._id,
    endDate: dateInYear,
    pricePaid: package.pricePerYear * (1 - receiver.familyDiscount),
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
};

// id titanium package  6528d084a48689ecc9e8bd67
// id family member 6549529d2d11145d712f983f

const subscribeToHealthPackage = async (req, res) => {
  try {
    const { _id, receiverId } = req.body;
    // const username = req.userData.username;

    if (!_id) {
      throw Error("Please input package ID");
    }

    const receiver = await Patient.findOne({ _id: receiverId }).populate("healthPackage.package");

    if (!receiver) {
      throw Error("Receiver does not exist");
    }

    // ADD ADDITIONAL CONDITIONS HERE  ???
    // unsubscribed will throw an error
    if (
      receiver.healthPackage.package !== null &&
      receiver.healthPackage.status !== null &&
      receiver.healthPackage.status !== "cancelled"
    ) {
      throw Error("This receiver already has active benefits from a subscription");
    }

    const package = await HealthPackage.findOne({ _id });
    if (!package || !package.isActivated) {
      throw Error("Package does not exist");
    }

    await subscribe(receiver, package);

    res.status(200).json({ message: "Subscription successful!" });
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
      ...loggedIn.healthPackage,
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
        ...member.healthPackage,
        name: member.username,
        expiryDate: endDate || "N/A",
      };
    });
    res.status(200).json(familyPackageArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const payByWallet = async (req, res) => {
  try {
    const { deductible } = req.body;
    const username = req.userData.username;
    const loggedIn = await Patient.findOne({ username });

    if (loggedIn.wallet < deductible) {
      return res.status(500).json({ message: "Insufficient funds" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      loggedIn._id,
      { $inc: { wallet: -deductible } },
      { new: true }
    );

    res.status(200).json({ message: "Payment is successful", patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const creditDoctor = async (req, res) => {
  try {
    const { doctor_id, credit } = req.body;

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
      ...loggedIn.healthPackage,
      status: "cancelled",
      cancelDate,
    };
    const unusedMonths = calculateUnusedMonths(loggedIn.healthPackage.endDate, cancelDate);
    const pricePerMonth = loggedIn.healthPackage.pricePaid / 12;
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

    let testMember;
    for (const memberId of familyMemberIds) {
      const member = await Patient.findOne({ _id: memberId }).populate([
        {
          path: "linkedFamily.member",
          populate: {
            path: "healthPackage.package", // Replace with the actual field name you want to populate
            model: "HealthPackage", // Replace with the actual model name of the field you're populating
          },
        },
        "healthPackage.package",
      ]);

      // Check if there are other family members and at least one of them has an active package
      let maxDiscount = 0;
      member.linkedFamily.forEach((link) => {
        const meetsCondition =
          link.member._id !== loggedIn._id && // Exclude the currently logged-in user
          (link.member.healthPackage.status === "subscribed" ||
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
      ...familyMember.healthPackage,
      status: "cancelled",
      cancelDate,
    };
    const unusedMonths = calculateUnusedMonths(familyMember.healthPackage.endDate, cancelDate);
    const pricePerMonth = familyMember.healthPackage.pricePaid / 12;
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
        {
          path: "linkedFamily.member",
          populate: {
            path: "healthPackage.package", // Replace with the actual field name you want to populate
            model: "HealthPackage", // Replace with the actual model name of the field you're populating
          },
        },
        "healthPackage.package",
      ]);

      // Check if there are other family members and at least one of them has an active package
      let maxDiscount = 0;
      member.linkedFamily.forEach((link) => {
        const meetsCondition =
          link.member._id !== familyMember._id && // Exclude the currently logged-in user
          (link.member.healthPackage.status === "subscribed" ||
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

    if (!loggedIn.healthPackage.package || loggedIn.healthPackage.status !== "subscribed") {
      throw Error("You are not subscribed to any package");
    }
    const currentDate = new Date();
    const result = {
      status: "unsubscribed",
      package: loggedIn.healthPackage.package,
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

// const viewMyPackageStatus = async (req, res) => {
// 	try {
// 		const username = req.userData.username;
// 		const loggedIn = await Patient.findOne({ username });
// 		let result;

// 		if (loggedIn.healthPackage.status === "subscribed") {
// 			result = {
// 				status: loggedIn.healthPackage.status,
// 				renewalDate: loggedIn.healthPackage.endDate,
// 			};
// 		} else if (loggedIn.healthPackage.status === "unsubscribed") {
// 			result = {
// 				status: loggedIn.healthPackage.status,
// 				unsubscribeDate: loggedIn.healthPackage.unsubscribeDate,
// 			};
// 		} else if (loggedIn.healthPackage.status === "cancelled") {
// 			result = {
// 				status: loggedIn.healthPackage.status,
// 				cancelDate: loggedIn.healthPackage.cancelDate,
// 			};
// 		} else if (!loggedIn.healthPackage.status) {
// 			result = {
// 				status: "No subscription",
// 			};
// 		}
// 		res.status(200).json(result);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

// const viewFamilyPackageStatus = async (req, res) => {
// 	try {
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };

const test = async (req, res) => {
  const { mode } = req.body;

  if (mode === "success") {
    res.status(200).json({ message: "success" });
  } else {
    throw new Error("Insufficient funds");
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { username, appointmentId } = req.body;
    // const { username } = req.userData;

    const patient = await Patient.findOne({ username });

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { patient: patient._id, status: "upcoming" } },
      { new: true }
    );

    res.status(200).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  subscribeToHealthPackage,
  getMyPackage,
  getFamilyPackages,
  payByWallet,
  viewWallet,
  selfCancelSubscription,
  familyCancelSubscription,
  packageUnsubscribe,
  uploadMedicalHistory,
  deleteMedicalHistory,
  bookAppointment,
  creditDoctor,
};
