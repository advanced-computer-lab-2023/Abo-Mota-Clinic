const {Router} = require("express");
const {login, logout} = require('../controllers/authController');

const router  = Router();



router.post("/login" , login);
router.get("/logout", logout);


module.exports = router;