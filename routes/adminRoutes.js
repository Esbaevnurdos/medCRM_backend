// routes/employeeRoutes.js
const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/addEmployee", adminController.addEmployeeController);

module.exports = router;
