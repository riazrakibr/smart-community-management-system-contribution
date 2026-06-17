const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// IMPORT ROUTES
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const issueRoutes = require("./routes/issueRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const sustainabilityRoutes =
require("./routes/sustainabilityRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// SERVE UPLOADED IMAGES
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(
    "/api/sustainability",
    sustainabilityRoutes
);

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected YESSSS");
})
.catch((err) => {
    console.log("Mongo Error:", err.message);
});

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API Running Successfully");
});

// PORT
const PORT = process.env.PORT || 5000;

// START SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});