const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/addEmployee", adminController.addEmployeeController);
router.delete("/employees/:id", adminController.deleteEmployeeController);

router.post("/roles", adminController.createRoleController);

router.get("/roles", adminController.getRolesController);

router.put("/roles/:id", adminController.updateRoleController);

router.delete("/roles/:id", adminController.deleteRoleController);

module.exports = router;
