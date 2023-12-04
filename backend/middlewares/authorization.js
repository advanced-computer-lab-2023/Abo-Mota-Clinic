const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    console.log("COOKIES", req.cookies);
    const token = req.cookies.jwt;

    // Find keys that include "jwt"
    // const jwtKeys = Object.keys(req.cookies).filter(key => key.includes('jwt'));

    // // Retrieve values for keys that include "jwt"
    // const jwtValues = jwtKeys.map(key => ({key, token: req.cookies[key]}) );

    // console.log("JWT VALUES", jwtValues);

    if(token){

            jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
                if(err)
                    return res.status(404).json({message: "Unauthorized", isLoggedIn: false, error: err.message});
                
                req.userData = userData;  //userData is the payload included in the token
                const userType = userData.userType;
                //check if the user type allowed for the current route
            
                if(userType === 'admin' && (req.baseUrl).includes('/admin')){
                    console.log("OKAY")
                    next();
                }
                else if(userType === 'doctor' && ((req.baseUrl).includes('/doctor') || (req.baseUrl).includes('/common')))
                    next();
                else if (userType === 'patient' && ((req.baseUrl).includes('/patient') || (req.baseUrl).includes('/stripe') || (req.baseUrl).includes('/common')))
                    next();
                else
                    return res.status(403).json({ message: "Forbidden"});
            });
         

    }else{
        res.status(500).json({message: 'Unauthorized', isLoggedIn: false})
    }

}

// const authToken = (req, res, next) => {
//     console.log("COOKIES", req.cookies);
  
//     // Find keys that include "jwt"
//     const jwtKeys = Object.keys(req.cookies).filter((key) => key.includes('jwt'));
  
//     // If no JWT keys found, return unauthorized
//     if (jwtKeys.length === 0) {
//       return res.status(401).json({ message: 'Unauthorized', isLoggedIn: false });
//     }
  
//     // Array to store promises returned by jwt.verify
//     const verificationPromises = jwtKeys.map((key) => {
//       const token = req.cookies[key];
//       return new Promise((resolve) => {
//         jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
//           if (err) {
//             resolve(null);
//           } else {
//             resolve(userData);
//           }
//         });
//       });
//     });
  
//     // Wait for all promises to resolve
//     Promise.all(verificationPromises)
//       .then((userDatas) => {
//         // Find the all valid userData
//         const validUserData = userDatas.filter((userData) => userData !== null);
  
//         if (validUserData.length > 0) {
//           req.userData = validUserData;
//           const userType = validUserData.userType;
  
//           // Check if the user type is allowed for the current route
//           if (
//             (userType === 'admin' && req.baseUrl.includes('/admin')) ||
//             (userType === 'doctor' && (req.baseUrl.includes('/doctor') || req.baseUrl.includes('/common'))) ||
//             (userType === 'patient' && (req.baseUrl.includes('/patient') || req.baseUrl.includes('/stripe') || req.baseUrl.includes('/common')))
//           ) {
//             console.log("OKAY");
//             next();
//           } else {
//             res.status(403).json({ message: 'Forbidden' });
//           }
//         } else {
//           // No valid tokens found
//           res.status(401).json({ message: 'Unauthorized', isLoggedIn: false });
//         }
//       })
//       .catch((error) => {
//         console.error('Error verifying JWT tokens:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       });
//   };

module.exports = authToken;