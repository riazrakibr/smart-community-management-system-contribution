const express = require("express");

const router = express.Router();

const {
    addData
} = require("../controllers/sustainabilityController");

const protect = require("../middleware/authMiddleware");

router.post(
    "/",
    addData
);

module.exports = router;