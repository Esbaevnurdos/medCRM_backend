const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("admin/register", authController.registerUser);
router.post("admin/request-otp", authController.requestOTP);
router.post("admin/set-password", authController.verifyAndSetPassword);
router.post("admin/login", authController.loginUser);
router.post("admin/logout", authController.logoutUser);

module.exports = router;
