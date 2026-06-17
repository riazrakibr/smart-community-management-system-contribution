const express = require("express");

const router = express.Router();

const {
    generateSuggestion
} = require("../controllers/aiController");

router.post("/suggestion", generateSuggestion);

module.exports = router;