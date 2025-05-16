const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/addEmployee", adminController.addEmployeeController);
router.delete("/employees/:id", adminController.deleteEmployeeController);

router.post("/roles", adminController.createRoleController);
router.get("/roles", adminController.getRolesController);
router.put("/roles/:id", adminController.updateRoleController);
router.delete("/roles/:id", adminController.deleteRoleController);

router.post("/permissions", adminController.addPermission); // Add a new permission
router.get("/permissions", adminController.getAllPermissions); // Get all permissions
router.put("/permissions/:id", adminController.updatePermission); // Update a permission
router.delete("/permissions/:id", adminController.deletePermission); // Delete a permission

// Branches Routes
router.post("/branches", adminController.addBranch); // Add a new branch
router.get("/branches", adminController.getAllBranches); // Get all branches
router.put("/branches/:id", adminController.updateBranch); // Update a branch
router.delete("/branches/:id", adminController.deleteBranch);

module.exports = router;
