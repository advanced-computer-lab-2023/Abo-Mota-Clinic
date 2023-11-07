const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Admin = require("../models/ClinicAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res)  => {
    const {username, password} = req.body;

    const patientExists = await Patient.findOne({username: username});
    const doctorExists = await Doctor.findOne({username: username});
    const adminExists = await Admin.findOne({username: username});

    if(!patientExists && !doctorExists && !adminExists){
        return res.json({
            message: "Invalid Username"
        })
    }

    let dbUserPass;
    if(patientExists)
        dbUserPass = patientExists.password;
    else if(doctorExists)
        dbUserPass = doctorExists.password;
    else
        dbUserPass = adminExists.password;

    bcrypt.compare(password, dbUserPass)
    .then( isCorrect => {
        //correct creds => create jwt token 
        if(isCorrect){
            const payload = {
                username: username
            }
            //create the token not yet saved in cookies
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn: 86400}, //expires after 1 day
                (err, token) => {
                    if(err) 
                        return res.json({message: err})
                    return res.json({
                        message: "Success",
                        token: "Bearer " + token
                    })
                }
            )
        } else {
            return res.json({
                message: "Invalid Password!"
            })
        }
    }

    )
    
}

const logout = (req,res) => {
    res.send("logged out")
}

module.exports = {
    login,
    logout
}



