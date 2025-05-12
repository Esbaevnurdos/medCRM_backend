const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/sign-up", authController.registerUser);
router.post("/request-otp", authController.requestOTP);
router.post("/set-password", authController.verifyAndSetPassword);
router.post("/sign-in", authController.loginUser);

module.exports = router;
