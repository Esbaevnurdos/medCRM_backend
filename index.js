const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

// ✅ Dynamic CORS setup to allow any origin with credentials
app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Patient Registration API");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
