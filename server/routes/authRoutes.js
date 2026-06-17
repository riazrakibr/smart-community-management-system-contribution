const express = require("express");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authController");


// Register Route
router.post("/register", registerUser);


// Login Route
router.post("/login", loginUser);


router.get("/profile", protect, getProfile);





module.exports = router;