const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/request-otp", authController.requestOTP);
router.post("/set-password", authController.verifyAndSetPassword);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;
