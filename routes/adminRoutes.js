const express = require("express");
const upload = require("./upload"); // import multer instance

const adminController = require("../controllers/adminController");

const router = express.Router();

router.post("/staff", adminController.addUserController);
router.delete("/staff/:id", adminController.deleteUserController);
router.get("/staff", adminController.getAllUsersController);
router.put("/sfaff/:id", adminController.updateUserController);
router.get("/staff/:id", adminController.getUserByIdController);

router.post("/roles", adminController.createRoleController);
router.get("/roles", adminController.getRolesController);
router.put("/roles/:id", adminController.updateRoleController);
router.delete("/roles/:id", adminController.deleteRoleController);
router.get("/roles/:id", adminController.getRoleByIdController);

router.post("/permissions", adminController.addPermission);
router.get("/permissions", adminController.getAllPermissions);
router.put("/permissions/:id", adminController.updatePermission);
router.delete("/permissions/:id", adminController.deletePermission);
router.get("/permissions/:id", adminController.getPermissionById);

router.post("/branches", adminController.addBranch);
router.get("/branches", adminController.getAllBranches);
router.put("/branches/:id", adminController.updateBranch);
router.delete("/branches/:id", adminController.deleteBranch);
router.get("/branches/:id", adminController.getBranchById);

router.post("/specialists", adminController.addSpecialist);
router.put("/specialists/:id", adminController.editSpecialist);
router.delete("/specialists/:id", adminController.deleteSpecialist);
router.get("/specialists", adminController.getAllSpecialists);
router.get("/specialists/:id", adminController.getSpecialistById);

router.post("/patients", adminController.addPatient);
router.get("/patients", adminController.getAllPatients);
router.put("/patients/:id", adminController.updatePatient);
router.delete("/patients/:id", adminController.deletePatient);
router.get("/patients/:id", adminController.getPatientById);

router.post("/appointments", adminController.addAppointment);
router.get("/appointments", adminController.getAllAppointments);
router.put("/appointments/:id", adminController.updateAppointment);
router.delete("/appointments/:id", adminController.deleteAppointment);
router.get("/appointments/:id", adminController.getAppointmentById);

router.post("/services", adminController.addService);
router.get("/services", adminController.getAllServices);
router.put("/services/:id", adminController.updateService);
router.delete("/services/:id", adminController.deleteAppointment);
router.get("/services/:id", adminController.getServiceById);

router.post("/category_expences", adminController.addExpenseCategory);
router.get("/category_expences", adminController.getExpenseCategories);
router.put("/category_expences/:id", adminController.editExpenseCategory);
router.delete("/category_expences/:id", adminController.deleteExpenseCategory);
router.get("/category_expences/:id", adminController.getExpenseCategoryById);

router.post("/expences", adminController.addExpense);
router.get("/expences", adminController.getExpenses);
router.put("/expences/:id", adminController.editExpense);
router.delete("/expences/:id", adminController.deleteExpense);
router.get("/expences/:id", adminController.getExpenseById);

router.post("/cashbox", adminController.createCashboxTransaction);
router.get("/cashbox", adminController.getCashboxTransactions);
router.get("/cashbox/:id", adminController.getCashboxTransactionById);
router.put("/cashbox/:id", adminController.updateCashboxTransaction);
router.delete("/cashbox/:id", adminController.deleteCashboxTransactionById);

router.get("/organization", adminController.getOrganizationSettings);
router.put("/organization", adminController.updateOrganizationSettings);

router.get("/expenses_report/:type", adminController.getExpenseReportByPeriod);
router.get(
  "/expenses_report/:start_date/:end_date",
  adminController.getExpenseReportByDateRange
);
router.get("/cashbox-reports/:type", adminController.getCashboxReportByPeriod);
router.get(
  "/cashbox-reports-range/:start_date/:end_date",
  adminController.getCashboxReportByDateRange
);

router.get(
  "/appointments-report/:period",
  adminController.getAppointmentsReportByPeriod
);
router.get(
  "/appointments-report/:start_date/:end_date",
  adminController.getAppointmentsReportByDateRange
);

router.get("/appointments-report", adminController.getAllReportAppointments);

router.post(
  "/upload-photo",
  upload.single("image"),
  adminController.uploadUserPhoto
);

module.exports = router;
