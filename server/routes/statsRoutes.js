const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");
const Sustainability = require("../models/Sustainability");

const SuggestionLog = require("../models/SuggestionLog");

router.get("/", async (req, res) => {
  try {

    const aiSuggestions =
    await SuggestionLog.countDocuments();
    const totalIssues = await Issue.countDocuments();

    const resolvedIssues = await Issue.countDocuments({
      status: "Resolved"
    });

    const pendingIssues = await Issue.countDocuments({
      status: "Pending"
    });

    const sustainabilityDrives =
      await Sustainability.countDocuments();


    res.json({
      issuesReported: totalIssues,
      residentsHelped: resolvedIssues,
      aiSuggestions,
      sustainabilityDrives
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;