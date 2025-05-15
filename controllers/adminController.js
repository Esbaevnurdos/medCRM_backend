const db = require("../db/queries");

const addEmployeeController = async (req, res) => {
  try {
    console.log(req.body);

    const { fullName, password, email, phone, address, branch, status, role } =
      req.body;

    if (
      !fullName ||
      !password ||
      !email ||
      !phone ||
      !role ||
      !branch ||
      !status ||
      !address
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newEmployee = await db.addEmployee(
      fullName,
      password,
      email,
      phone,
      address,
      branch,
      status,
      role
    );

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res.status(500).json({ error: "Server error during employee creation" });
  }
};

const deleteEmployeeController = async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteEmployee(id);
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    res.status(500).json({ error: "Server error during employee deletion" });
  }
};

const createRoleController = async (req, res) => {
  const { roleName, accessLevel } = req.body;

  if (!roleName || roleName.length < 2) {
    return res
      .status(400)
      .json({ error: "Role name must contain at least 2 characters" });
  }

  try {
    const newRole = await db.createRole(roleName, accessLevel);
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    console.error("Error creating role:", error.message);
    res.status(500).json({ error: "Server error during role creation" });
  }
};

// Get All Roles
const getRolesController = async (req, res) => {
  try {
    const roles = await db.getAllRoles();
    res.json({ success: true, roles });
  } catch (error) {
    console.error("Error fetching roles:", error.message);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
};

// Update Role
const updateRoleController = async (req, res) => {
  const { id } = req.params;
  const { roleName, accessLevel } = req.body;

  if (!roleName || roleName.length < 2) {
    return res
      .status(400)
      .json({ error: "Role name must contain at least 2 characters" });
  }

  try {
    const updatedRole = await db.updateRole(id, roleName, accessLevel);
    res.json({
      success: true,
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (error) {
    console.error("Error updating role:", error.message);
    res.status(500).json({ error: "Server error during role update" });
  }
};

const deleteRoleController = async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteRole(id);
    res.json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error.message);
    res.status(500).json({ error: "Server error during role deletion" });
  }
};

module.exports = {
  addEmployeeController,
  deleteEmployeeController,
  createRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController,
};
