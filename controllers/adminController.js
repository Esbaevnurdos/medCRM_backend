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

const addPermission = async (req, res) => {
  const { name, description, code } = req.body;
  try {
    const permission = await db.addPermission(name, description, code);
    res.status(201).json({ success: true, data: permission });
  } catch (error) {
    console.error("Error adding permission:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to add permission" });
  }
};

// Get All Permissions
const getAllPermissions = async (req, res) => {
  try {
    const permissions = await db.getAllPermissions();
    res.status(200).json({ success: true, data: permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch permissions" });
  }
};

// Update Permission
const updatePermission = async (req, res) => {
  const { id } = req.params;
  const { name, description, code } = req.body;
  try {
    const updatedPermission = await db.updatePermission(
      id,
      name,
      description,
      code
    );
    res.status(200).json({ success: true, data: updatedPermission });
  } catch (error) {
    console.error("Error updating permission:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update permission" });
  }
};

// Delete Permission
const deletePermission = async (req, res) => {
  const { id } = req.params;
  try {
    await db.deletePermission(id);
    res
      .status(200)
      .json({ success: true, message: "Permission deleted successfully" });
  } catch (error) {
    console.error("Error deleting permission:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete permission" });
  }
};

const addBranch = async (req, res) => {
  const { name, address, email, phoneNumber, status } = req.body;
  try {
    const branch = await db.addBranch(
      name,
      address,
      email,
      phoneNumber,
      status
    );
    res.status(201).json({ success: true, data: branch });
  } catch (error) {
    console.error("Error adding branch:", error.message);
    res.status(500).json({ success: false, message: "Failed to add branch" });
  }
};

// Get All Branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await db.getAllBranches();
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    console.error("Error fetching branches:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch branches" });
  }
};

// Update Branch
const updateBranch = async (req, res) => {
  const { id } = req.params;
  const { name, address, email, phoneNumber, status } = req.body;
  try {
    const updatedBranch = await db.updateBranch(
      id,
      name,
      address,
      email,
      phoneNumber,
      status
    );
    res.status(200).json({ success: true, data: updatedBranch });
  } catch (error) {
    console.error("Error updating branch:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update branch" });
  }
};

// Delete Branch
const deleteBranch = async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteBranch(id);
    res
      .status(200)
      .json({ success: true, message: "Branch deleted successfully" });
  } catch (error) {
    console.error("Error deleting branch:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete branch" });
  }
};

module.exports = {
  addEmployeeController,
  deleteEmployeeController,
  createRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController,
  addBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
  addPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
};
