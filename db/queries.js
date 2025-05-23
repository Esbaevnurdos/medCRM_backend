const db = require("./db");

const findUserByEmail = async (email) => {
  return await db.query("SELECT * FROM users WHERE email = $1", [email]);
};

const findUserByPhoneNumber = async (phoneNumber) => {
  return await db.query("SELECT * FROM users WHERE phone_number = $1", [
    phoneNumber,
  ]);
};

const createUser = async (fullname, email, phoneNumber, otp, otpExpiry) => {
  try {
    const hashedPassword = null;

    return await db.query(
      `INSERT INTO users (fullname, email, phone_number, password, otp_code, otp_expiry, is_verified) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, fullname, email, phone_number`,
      [fullname, email, phoneNumber, hashedPassword, otp, otpExpiry, false]
    );
  } catch (error) {
    console.error("Error during user creation:", error);
    throw new Error("Failed to create user");
  }
};
const findUserByEmailAndOTP = async (email, otp) => {
  return await db.query(
    `SELECT * FROM users WHERE email=$1 AND otp_code=$2 AND otp_expiry > NOW()`,
    [email, otp]
  );
};

const updateUserPassword = async (email, hashedPassword) => {
  return await db.query(
    `UPDATE users SET password = $1, is_verified = true WHERE email = $2`,
    [hashedPassword, email]
  );
};

const updateUserOTP = async (email, otp, otpExpiry) => {
  try {
    return await db.query(
      `INSERT INTO users (email, otp_code, otp_expiry) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (email) 
       DO UPDATE SET otp_code = $2, otp_expiry = $3`,
      [email, otp, otpExpiry]
    );
  } catch (error) {
    console.error("Error updating OTP:", error);
    throw new Error("Failed to update OTP");
  }
};

const createPatientRecord = async (userId, diagnosis, notes) => {
  const result = await db.query(
    `INSERT INTO patient_records (user_id, diagnosis, notes) 
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, diagnosis, notes]
  );
  return result;
};

const updateUserProfile = async (id, address, dateOfBirth) => {
  return db.query(
    `UPDATE users SET address = $1, date_of_birth = $2 WHERE id = $3`,
    [address, dateOfBirth, id]
  );
};

const bookAppointment = async (patientId, doctorId, date, time, reason) => {
  const query = `
    INSERT INTO appointments (patient_id, doctor_id, date, time, reason) 
    VALUES ($1, $2, $3, $4, $5);
  `;
  const values = [patientId, doctorId, date, time, reason];
  try {
    await db.query(query, values);
    console.log("Appointment booked successfully");
  } catch (err) {
    console.error("Error booking appointment:", err);
    throw err;
  }
};

const addEmployee = async (
  fullName,
  password,
  email,
  phone,
  address,
  branch,
  status,
  role
) => {
  const query = `
    INSERT INTO staff (full_name, password, email, phone, address, branch, status, role)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    fullName,
    password,
    email,
    phone,
    address,
    branch,
    status,
    role,
  ];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error in addEmployee query:", error.message);
    throw new Error("Database error");
  }
};

const deleteEmployee = async (id) => {
  const query = `DELETE FROM staff WHERE id = $1;`;
  try {
    await db.query(query, [id]);
    console.log("Employee deleted successfully");
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    throw error;
  }
};

const getAvailableDoctors = async () => {
  const query = `
    SELECT id, full_name, phone, branch, status 
    FROM staff 
    WHERE role = 'врач' AND status = 'активный';
  `;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error getting available doctors:", error.message);
    throw error;
  }
};

const updateDoctorStatus = async (id, status) => {
  const query = `
    UPDATE staff 
    SET status = $1 
    WHERE id = $2 AND role = 'doctor' 
    RETURNING *;
  `;
  try {
    const result = await db.query(query, [status, id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating doctor status:", error.message);
    throw error;
  }
};

const createRole = async (roleName, accessLevel = "basic") => {
  const query = `
    INSERT INTO roles (role_name, access_level)
    VALUES ($1, $2)
    RETURNING *;
  `;
  try {
    const result = await db.query(query, [roleName, accessLevel]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating role:", error.message);
    throw error;
  }
};

const getAllRoles = async () => {
  const query = `SELECT * FROM roles;`;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching roles:", error.message);
    throw error;
  }
};

const updateRole = async (id, roleName, accessLevel) => {
  const query = `
    UPDATE roles SET role_name = $1, access_level = $2
    WHERE id = $3
    RETURNING *;
  `;
  try {
    const result = await db.query(query, [roleName, accessLevel, id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating role:", error.message);
    throw error;
  }
};

const deleteRole = async (id) => {
  const query = `DELETE FROM roles WHERE id = $1;`;
  try {
    await db.query(query, [id]);
  } catch (error) {
    console.error("Error deleting role:", error.message);
    throw error;
  }
};

const addPermission = async (name, description, code) => {
  const query = `
    INSERT INTO permissions (name, description, code) 
    VALUES ($1, $2, $3) 
    RETURNING *;
  `;
  try {
    const result = await db.query(query, [name, description, code]);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding permission:", error.message);
    throw error;
  }
};

const getAllPermissions = async () => {
  const query = `SELECT * FROM permissions;`;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching permissions:", error.message);
    throw error;
  }
};

const updatePermission = async (id, name, description, code) => {
  const query = `
    UPDATE permissions 
    SET name = $1, description = $2, code = $3 
    WHERE id = $4 
    RETURNING *;
  `;
  try {
    const result = await db.query(query, [name, description, code, id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating permission:", error.message);
    throw error;
  }
};

const deletePermission = async (id) => {
  const query = `DELETE FROM permissions WHERE id = $1;`;
  try {
    await db.query(query, [id]);
    console.log("Permission deleted successfully");
  } catch (error) {
    console.error("Error deleting permission:", error.message);
    throw error;
  }
};

const addBranch = async (
  name,
  address,
  email,
  phoneNumber,
  status = "Активный"
) => {
  const query = `
    INSERT INTO branches (name, address, email, phone_number, status) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
  `;
  try {
    const result = await db.query(query, [
      name,
      address,
      email,
      phoneNumber,
      status,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding branch:", error.message);
    throw error;
  }
};

const getAllBranches = async () => {
  const query = `SELECT * FROM branches;`;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching branches:", error.message);
    throw error;
  }
};

const updateBranch = async (id, name, address, email, phoneNumber, status) => {
  const query = `
    UPDATE branches 
    SET name = $1, address = $2, email = $3, phone_number = $4, status = $5 
    WHERE id = $6 
    RETURNING *;
  `;
  try {
    const result = await db.query(query, [
      name,
      address,
      email,
      phoneNumber,
      status,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating branch:", error.message);
    throw error;
  }
};

const deleteBranch = async (id) => {
  const query = `DELETE FROM branches WHERE id = $1;`;
  try {
    await db.query(query, [id]);
    console.log("Branch deleted successfully");
  } catch (error) {
    console.error("Error deleting branch:", error.message);
    throw error;
  }
};

module.exports = {
  findUserByEmail,
  createUser,
  updateUserPassword,
  updateUserOTP,
  findUserByEmailAndOTP,
  findUserByPhoneNumber,
  createPatientRecord,
  updateUserProfile,
  bookAppointment,
  addEmployee,
  getAvailableDoctors,
  updateDoctorStatus,
  createRole,
  getAllRoles,
  updateRole,
  deleteRole,
  deleteEmployee,
  addPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
  addBranch,
  getAllBranches,
  updateBranch,
  deleteBranch,
};
