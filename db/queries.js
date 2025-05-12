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

module.exports = {
  findUserByEmail,
  createUser,
  updateUserPassword,
  updateUserOTP,
  findUserByEmailAndOTP,
  findUserByPhoneNumber,
};
