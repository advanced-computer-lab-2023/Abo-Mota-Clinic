const express = require("express");
const {subscribe} = require("../controllers/serviceWorkerController");
const router = express.Router();
const authorize = require("../middlewares/authorization");


router.post("/subscribe", subscribe);

module.exports = router;