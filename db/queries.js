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
};
