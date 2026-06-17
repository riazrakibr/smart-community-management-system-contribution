const express = require("express");

const router = express.Router();

const {
    createIssue,
    getIssues,
    updateIssueStatus,
    deleteIssue
} = require("../controllers/issueController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");



// CREATE ISSUE
router.post(
    "/",
    protect,
    upload.single("image"),
    createIssue
);



// GET ALL ISSUES
router.get(
    "/",
    protect,
    getIssues
);



// UPDATE ISSUE STATUS
router.put(
    "/:id",
    protect,
    updateIssueStatus
);



// DELETE ISSUE
router.delete(
    "/:id",
    protect,
    deleteIssue
);



module.exports = router;