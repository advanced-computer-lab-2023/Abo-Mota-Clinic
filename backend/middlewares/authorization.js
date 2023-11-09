const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    const token = req.cookies.jwt;

    console.log(token)

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
            if(err)
                return res.status(404).json({message: "Unauthorized", isLoggedIn: false, error: err.message});
            
            req.userData = userData;  //userData is the payload included in the token
            const userType = userData.userType;
            //check if the user type allowed for the current route
            console.log("baseUrl", req.baseUrl)
            if(userType === 'admin' && (req.baseUrl).includes('/admin')){
                console.log("OKAY")
                next();
            }
            else if(userType === 'doctor' && (req.baseUrl).includes('/doctor'))
                next();
            else if (userType === 'patient' && (req.baseUrl).includes('/patient'))
                next();
            else
                return res.status(403).json({ message: "Forbidden"});
        })
    }else{
        res.status(500).json({message: 'Unauthorized', isLoggedIn: false})
    }

}

module.exports = authToken;