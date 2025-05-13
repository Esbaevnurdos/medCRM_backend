const { addEmployee } = require("../db/queries");

const addEmployeeController = async (req, res) => {
  try {
    console.log(req.body);

    const { fullName, password, email, phone, address, branch, status, role } =
      req.body;

    if (!fullName || !password || !email || !phone || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newEmployee = await addEmployee(
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

module.exports = { addEmployeeController };
